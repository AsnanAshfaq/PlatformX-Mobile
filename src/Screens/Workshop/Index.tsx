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
import {darkColors} from '../../Constants/Colors';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {ToastAndroid} from 'react-native';
import WorkshopCard from '../../Components/WorkshopCard';
import WorkshopSkeleton from '../../Skeleton/WorkshopCardSkeleton';
import {workshopFilterData} from '../../Constants/sample';

type props = {
  navigation: any;
};
const Workshop: FC<props> = ({navigation}) => {
  const [Workshops, setWorkshops] = useState([]);
  // const isFocuses = useIsFocused();
  const [IsLoading, setIsLoading] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    axios
      .get('/api/workshops/')
      .then(response => {
        setWorkshops(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response.data) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
      });
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
    <View style={styles.parent}>
      <CustomHeader
        title={'Workshops'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      {Workshops.length > 0 ? (
        <>
          <CustomSearch placeholder={'Search here'} showFilterIcon />
          <FlatList
            data={Workshops}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: workshop, index}: any) => {
              return (
                <WorkshopCard
                  navigation={navigation}
                  workshopDetail={workshop}
                />
              );
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
      ) : !IsLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noMoreText}>No more Workshops</Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WorkshopSkeleton />
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
  noMoreText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
    color: darkColors.TOMATO_COLOR,
  },
});

export default Workshop;
