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
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
// import {darkColors} from '../../Constants/Colors';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};
const Projects: FC<props> = ({navigation}) => {
  const [Project, setProject] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [state, dispatch] = useStateValue();
  const [IsLoading, setIsLoading] = useState(true);

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
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      <CustomHeader
        title={'Projects'}
        navigation={navigation}
        drawer
        chat
        bell
      />
      <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
      {Project.length > 0 ? (
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
                colors={[state.theme.TEXT_COLOR]}
                progressBackgroundColor={state.theme.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // inverted
            contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : !IsLoading ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: state.theme.TEXT_COLOR}]}>
            No more Projects
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text
              style={[styles.refreshText, {color: state.theme.TOMATO_COLOR}]}>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // floatingButtonContainer: {
  //   position: 'absolute',
  //   width: 60,
  //   height: 60,
  //   borderWidth: 2,
  //   borderRadius: 30,
  //   bottom: 20,
  //   right: 12,
  //   borderColor: 'transparent',
  //   backgroundColor: darkColors.TOMATO_COLOR,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // plusText: {
  //   fontSize: Sizes.large * 1.4,
  //   color: darkColors.TEXT_COLOR,
  // },
  // skeleton: {
  //   height: 10,
  // },
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});

export default Projects;
