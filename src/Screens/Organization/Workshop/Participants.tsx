// TODO:
// show list of users who are attending the workshop

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import {useStateValue} from '../../../Store/StateProvider';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import axios from '../../../Utils/Axios';
import UserCard from '../../../Components/UserCard';
import {Sizes, Width} from '../../../Constants/Size';
import {commaSeperator} from '../../../Utils/Numbers';

const ATTENDEES = [
  {
    id: 1,
    image:
      'https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png',
    name: 'Asnan Ashfaq',
    username: '@shanay_ash',
  },
  {
    id: 2,
    image:
      'https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png',
    name: 'Asnan Ashfaq',
    username: '@shanay_ash',
  },
  {
    id: 3,
    image:
      'https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png',
    name: 'Asnan Ashfaq',
    username: '@shanay_ash',
  },
  {
    id: 4,
    image:
      'https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png',
    name: 'Asnan Ashfaq',
    username: '@shanay_ash',
  },
];
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const Participants: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [WorkshopData, setWorkshopData] = useState({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // get data here
  };
  useEffect(() => {
    // fetch workshop participants
    // axios
    //   .get(`/api/hackathon/${ID}`)
    //   .then(result => {
    //     setWorkshopData(result.data);
    //     setLoading(false);
    //   })
    //   .catch(error => setLoading(false));
    console.log('Fetching workshop participant');
  }, [ID]);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Participants'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* if there are no attendees  */}
      {ATTENDEES.length > 0 ? (
        <>
          <View style={{marginHorizontal: Width * 0.04}}>
            <View style={styles.container}>
              <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                See who is attending your workshop. (Attendees{' '}
                {commaSeperator(ATTENDEES.length)})
              </Text>
            </View>
          </View>

          <FlatList
            keyExtractor={(item: any, index) => `${item.id}`}
            data={ATTENDEES}
            renderItem={({item, index}) => (
              <UserCard {...item} navigation={navigation} />
            )}
            contentContainerStyle={styles.scroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.REFRESH_COLOR]}
                progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
          />
        </>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.DIM_TEXT_COLOR}]}>
            You don't have any attendees yet
          </Text>
        </View>
      )}

      {/* ()
      ) : (
        <ListSkeleton repition={5} />
      )} */}
    </View>
  );
};

export default Participants;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginVertical: 10,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
});
