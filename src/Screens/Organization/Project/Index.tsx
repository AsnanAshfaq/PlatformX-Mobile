import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Keyboard,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes} from '../../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
import FloatingActionButton from '../../../Components/FloatingActionButton';

type props = {
  navigation: any;
};
const Projects: FC<props> = ({navigation}) => {
  const [Project, setProject] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [IsLoading, setIsLoading] = useState(true);
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     // getData();
  //   }, []),
  // );

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        // setProject(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('Error is', error);
    }
  };

  const handleSearch = () => {
    console.log('Handling search for projects');
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
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader title={'Projects'} navigation={navigation} drawer bell />
      {!IsLoading && (
        <CustomSearch
          placeholder={'Search here'}
          showFilterIcon={false}
          isShownInHeader={false}
          handleSearch={handleSearch}
        />
      )}
      {Searching.isSearching ? (
        <>
          <PostSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Project.length > 0 ? (
        <>
          <FlatList
            data={Project}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: Project, index}: any) => {
              return <Text>This is the project screen</Text>;
              // return <PostCard key={Project?.id} postDetail={Project} />;
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
          <FloatingActionButton
            onPress={() =>
              navigation.navigate('Create_Edit_Post', {
                screen: 'Create',
              })
            }
          />
        </>
      ) : !IsLoading ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && Project.length === 0
              ? `No result Found for ${Searching.query}`
              : 'No projects yet'}
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PostSkeleton showSearchSkeleton={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Projects;
