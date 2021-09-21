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

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        setPost(response.data);
        setIsLoading(false);
      });
    } catch (error: any) {
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => {
      // console.log(Post);
      setRefreshing(false);
    });
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
      {Post.length > 0 ? (
        <>
          <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
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
      ) : !IsLoading ? (
        <View style={styles.center}>
          <Text
            style={[
              styles.noMoreText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            No Posts yet
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.TOMATO_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PostSkeleton />
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
