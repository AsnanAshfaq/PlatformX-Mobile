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
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {ToastAndroid} from 'react-native';
import WorkshopCard from '../../Components/WorkshopCard';
import WorkshopSkeleton from '../../Skeleton/WorkshopCardSkeleton';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const Workshop: FC<props> = ({navigation}) => {
  const [Workshops, setWorkshops] = useState([]);
  // const isFocuses = useIsFocused();
  const [IsLoading, setIsLoading] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });

  const getData = async () => {
    axios
      .get('/api/workshops/')
      .then(response => {
        setWorkshops(response.data);
        setIsLoading(false);
        setSearching({
          isSearching: false,
          query: '',
        });
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
      setRefreshing(false);
      // handle seaching state
      setSearching({
        isSearching: false,
        query: '',
      });
    });
  };

  const handleSearch = (query: string) => {
    // set the searching to true
    setSearching({
      isSearching: true,
      query: query,
    });
    try {
      axios.get(`/api/workshop/search/?q=${query}`).then(response => {
        setWorkshops(response.data);
        setIsLoading(false);
        setSearching(props => {
          return {
            isSearching: false,
            query: props.query,
          };
        });
      });
    } catch (error: any) {
      setSearching(props => {
        return {
          isSearching: false,
          query: props.query,
        };
      });
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  const applyFilters = () => {
    console.log('Applying workshop filters');
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

  console.log('Is loading is', IsLoading);
  console.log('Workshops are', Workshops.length);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Workshops'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      {!IsLoading && (
        <CustomSearch
          placeholder={'Search workshops'}
          showFilterIcon={true}
          handleSearch={handleSearch}
          applyFilters={applyFilters}
        />
      )}
      {/* if searching  then show post skeleton without search skeleton*/}
      {Searching.isSearching ? (
        <>
          <WorkshopSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Workshops.length > 0 ? (
        <>
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
                colors={[theme.TEXT_COLOR]}
                progressBackgroundColor={theme.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // inverted
            contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : !IsLoading && Workshops.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && Workshop.length === 0
              ? `No result Found for ${Searching.query}`
              : 'No workshops yet'}
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.TOMATO_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WorkshopSkeleton
          showSearchSkeleton={!Searching.isSearching || Refreshing}
        />
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
  // height: 10,
  // },
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});

export default Workshop;
