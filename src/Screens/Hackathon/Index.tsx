import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import HackathonCard from '../../Components/HackathonCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
import {postData} from '../../Constants/sample';
import {darkColors} from '../../Constants/Colors';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import HackathonSkeleton from '../../Skeleton/HackathonCardSkeleton';

type props = {
  navigation: any;
};
const Hackathons: FC<props> = ({navigation}) => {
  const [Hackathons, setHackathons] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('is focues', isFocuses);
  //     // getData();
  //   }, []),
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('Screen is focused');
  //     getData();
  //   }, []),
  // );
  const getData = async () => {
    try {
      axios.get('/api/hackathons/').then(response => {
        setHackathons(response.data);
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
    <View style={styles.parent}>
      <CustomHeader
        title={'Hackathons'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      {Hackathons.length > 0 ? (
        <>
          <CustomSearch placeholder={'Search here'} showFilterIcon />
          <FlatList
            data={Hackathons}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: Hackathon, index}: any) => {
              return (
                <HackathonCard
                  key={Hackathon?.id}
                  hackathonDetail={Hackathon}
                  navigation={navigation}
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
            // contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : !IsLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noMoreText}>No more hackathons</Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <HackathonSkeleton />
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
    right: 5,
    borderColor: 'transparent',
    backgroundColor: darkColors.TOMATO_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Hackathons;
