//FIXME: Searching Post
// when the use clicks the search button
// make api call
// i need to show the skeleton... HOw??
// okay
// so when the screen first loads
// Post.length === 0 and isLoading is true
// so the skelton gets showed
// but when the user clicks on search
// Post.length !== 0 , so it shows the postCard
// Make the posts to

import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import PostCard from '../../Components/PostCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  const [Post, setPost] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
    response: '' | 'Empty' | 'Data';
  }>({
    isSearching: false,
    query: '',
    response: '',
  });

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        setPost(response.data);
        setIsLoading(false);
        setSearching({
          isSearching: false,
          query: '',
          response: '',
        });
      });
    } catch (error: any) {
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => {
      setRefreshing(false);
      // handle seaching state
      setSearching({
        isSearching: false,
        query: '',
        response: '',
      });
    });
  };

  const handleSearch = (query: string) => {
    // set the searching to true
    setSearching({
      isSearching: true,
      query: query,
      response: '',
    });
    try {
      axios.get(`/api/post/search/?q=${query}`).then(response => {
        setPost(response.data);
        setIsLoading(false);
        setSearching(props => {
          return {
            isSearching: false,
            query: props.query,
            response: response.data.length === 0 ? 'Empty' : 'Data',
          };
        });
      });
    } catch (error: any) {
      setSearching(props => {
        return {
          isSearching: false,
          query: props.query,
          response: 'Empty',
        };
      });
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader title={'Home'} navigation={navigation} drawer chat bell />

      {/* if i am searching  then show post skeleton without search skeleton*/}
      {Searching.isSearching ? (
        <>
          <CustomSearch
            placeholder={
              Searching.query === '' ? 'Search here' : Searching.query
            }
            showFilterIcon={false}
            handleSearch={handleSearch}
          />
          <PostSkeleton showSearch={!Searching.isSearching} />
        </>
      ) : Post.length > 0 ? (
        <>
          <CustomSearch
            placeholder={
              Searching.query === '' ? 'Search here' : Searching.query
            }
            showFilterIcon={false}
            handleSearch={handleSearch}
          />
          <FlatList
            data={Post}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: post, index}: any) => {
              return <PostCard postDetail={post} navigation={navigation} />;
            }}
            // progressViewOffset={10}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={[theme.TEXT_COLOR]}
                progressBackgroundColor={theme.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // inverted
            contentOffset={{y: -300, x: 0}}
          />
          {/* floating action button  */}
          <View
            style={[
              styles.floatingButtonContainer,
              {
                backgroundColor: theme.TOMATO_COLOR,
              },
            ]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Create_Edit_Post', {screen: 'Create'})
              }>
              <Text
                style={[
                  styles.plusText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : !IsLoading && Post.length === 0 ? (
        <>
          <CustomSearch
            placeholder={
              Searching.query === '' ? 'Search here' : Searching.query
            }
            showFilterIcon={false}
            handleSearch={handleSearch}
          />
          <View style={styles.center}>
            <Text
              style={[
                styles.noMoreText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {Searching.query !== '' && Searching.response === 'Empty'
                ? `No result Found for ${Searching.query}`
                : 'No posts yet'}
            </Text>
            {Searching.query === '' && (
              <TouchableOpacity onPress={() => setIsLoading(true)}>
                <Text style={[styles.refreshText, {color: theme.TOMATO_COLOR}]}>
                  Refresh
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <PostSkeleton showSearch={!Searching.isSearching} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    bottom: 20,
    right: 12,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.large * 1.4,
  },
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});

export default Posts;
