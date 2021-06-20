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
import HackathonSkeleton from '../../Skeleton/HackathonSkeleton';

type props = {
  navigation: any;
};
const Hackathons: FC<props> = ({navigation}) => {
  const [Hackathons, setHackathons] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('is focues', isFocuses);
      // getData();
    }, []),
  );
  const getData = async () => {
    try {
      axios.get('/api/hackathons/').then(response => {
        setHackathons(response.data);
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
      <CustomHeader title={'Home'} navigation={navigation} drawer chat bell />
      <CustomSearch placeholder={'Search here'} showFilterIcon />
      {Hackathons.length > 0 ? (
        <>
          <FlatList
            data={Hackathons}
            // disableVirtualization
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({item: Hackathon, index}: any) => {
              return (
                <HackathonCard
                  key={Hackathon?.id}
                  hackathonDetail={Hackathon}
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
  plusText: {
    fontSize: Sizes.large * 1.4,
    color: darkColors.TEXT_COLOR,
  },
});

export default Hackathons;
