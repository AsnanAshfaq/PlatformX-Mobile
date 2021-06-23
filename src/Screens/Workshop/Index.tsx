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
import PostCard from '../../Components/PostCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
import {postData} from '../../Constants/sample';
import {darkColors} from '../../Constants/Colors';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../Skeleton/PostCardSkeleton';

type props = {
  navigation: any;
};
const Workshop: FC<props> = ({navigation}) => {
  const [Workshops, setWorkshops] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     // getData();
  //   }, []),
  // );

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        setWorkshops(response.data);
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
  }, []);

  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'Workshops'}
        navigation={navigation}
        drawer
        chat
        bell
      />
      <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
      {Workshops.length > 0 ? (
        <>
          <FlatList
            data={Workshops}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: workshop, index}: any) => {
              return <Text>This is the workshop component</Text>;

              //   return <PostCard key={workshop?.id} postDetail={workshop} />;
            }}
            // progressViewOffset={10}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={[darkColors.TEXT_COLOR]}
                progressBackgroundColor={darkColors.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // inverted
            contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : (
        // show the workshop skeleton
        <PostSkeleton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
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
    backgroundColor: darkColors.TOMATO_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.large * 1.4,
    color: darkColors.TEXT_COLOR,
  },
  skeleton: {
    // height: 10,
  },
});

export default Workshop;
