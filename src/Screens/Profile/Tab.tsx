import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Search from '../../Components/Search';
import UserCard from '../../Components/UserCard';
import Axios from '../../Utils/Axios';
import {TabView, SceneMap} from 'react-native-tab-view';
import {darkColors} from '../../Constants/Colors';
import {Sizes, Width} from '../../Constants/Size';

type cardProps = {
  data: [];
  screens: 'Followers' | 'Following';
};
type screens = 'Followers' | 'Following';

const Card: FC<cardProps> = ({data, screens}) => {
  return (
    <View style={styles.cardParent}>
      {/* profile image container  */}
      <View style={styles.cardImageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
        />
      </View>
      {/* details container  */}
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardText}>Lucy Edison</Text>
        <Text style={styles.cardText}>@lucy10234</Text>
      </View>
      {/* remove container */}
      <View>
        <Text style={styles.cardText}>Remove</Text>
      </View>
    </View>
  );
};

const Followers: FC = () => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    Axios.get('/user/follower')
      .then(result => setFollowers(result.data))
      .then(() =>
        // set the loading to false
        setisLoading(false),
      );
  }, []);

  if (isLoading) return <Text>It is Loading </Text>;

  return (
    <View>
      <Search placeholder={'Seach Followers'} showFilterIcon={false} />
      <FlatList
        data={followers}
        renderItem={({item}) => <Card data={item} screens={'Followers'} />}
        keyExtractor={(item: any, _) => `${item.id}`}
      />
    </View>
  );
};

const Following: FC = () => {
  const [isLoading, setisLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    Axios.get('/user/following')
      .then(result => setFollowing(result.data))
      .then(() =>
        // set the loading to false
        setisLoading(false),
      );
  }, []);

  if (isLoading) return <Text>It is Loading </Text>;

  return (
    <View>
      <Search placeholder={'Seach Following'} showFilterIcon={false} />
      <FlatList
        data={following}
        renderItem={({item}) => <Card data={item} screens={'Following'} />}
        keyExtractor={(item: any, _) => `${item.id}`}
      />
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};

const Tab: FC<props> = ({navigation, route: Route}) => {
  const {
    activeScreen,
    userName,
  }: {activeScreen: screens; userName: string} = Route.params;

  const [index, setIndex] = useState(activeScreen === 'Followers' ? 0 : 1);
  const [routes] = useState([
    {key: 'followers', title: 'Followers'},
    {key: 'following', title: 'Following'},
  ]);

  // useEffect(() => {
  //   // get user followers and followings
  //   if (activeScreen === 'Following')
  //     Axios.get('/user/following')
  //       .then(result => setFollowing(result.data))
  //       .then(() =>
  //         // set the loading to false
  //         setisLoading(false),
  //       );
  //   if (activeScreen === 'Followers')
  //     Axios.get('/user/follower')
  //       .then(result => setFollowers(result.data))
  //       .then(() =>
  //         // set the loading to false
  //         setisLoading(false),
  //       );
  // }, [isLoading, activeScreen]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'followers':
        return <Followers />;
      case 'following':
        return <Following />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.parent}>
      <CustomHeader
        title={`@${userName}`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* follower and following tabs  */}

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        keyboardDismissMode={'auto'}
      />
      {/* {!isLoading ? <></> : <Text>No {activeScreen} to show </Text>} */}
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  cardParent: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 10,
    padding: 10,
    shadowColor: darkColors.SHADOW_COLOR,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {
      width: 10,
      height: 12,
    },
    elevation: 30,
  },
  cardImageContainer: {
    margin: 2,
    flex: 0.2,
  },
  cardImage: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  cardDetailsContainer: {
    flex: 0.8,
  },
  cardText: {
    fontSize: Sizes.normal,
    color: darkColors.TEXT_COLOR,
  },
});
