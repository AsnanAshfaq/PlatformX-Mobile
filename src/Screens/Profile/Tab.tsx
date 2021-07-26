import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Search from '../../Components/Search';
import FollowingModal from '../../Modals/FollowingModal';
import Axios from '../../Utils/Axios';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {darkColors} from '../../Constants/Colors';
import {Sizes, Width} from '../../Constants/Size';
import PopUpMenu from '../../Menu/FollowingCardPopUpMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PROFILE_IMAGE} from '../../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Loading from '../../Components/Loading';

type cardProps = {
  id: string;
  data: any;
  screens: 'Followers' | 'Following';
  showModal: () => void;
};

type screens = 'Followers' | 'Following';

const ICON_SIZE = Width * 0.07;

const Card: FC<cardProps> = ({data, screens, id, showModal}) => {
  return (
    <View style={styles.cardParent}>
      {/* profile image container  */}
      <View style={styles.cardImageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri:
              data.user_profile_image !== null
                ? BASE_URL + data.user_profile_image.path
                : PROFILE_IMAGE,
          }}
        />
      </View>
      {/* details container  */}
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardTextName}>
          {data.first_name + data.last_name}
        </Text>
        <Text style={styles.cardTextUserName}>@{data.username}</Text>
      </View>
      {/* icon container */}
      <View style={styles.cardIconContainer}>
        {screens === 'Following' && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <PopUpMenu Modal={showModal} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const Followers: FC = () => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    Axios.get('/user/follower')
      .then(result => {
        setFollowers(result.data);
      })
      .then(() => {
        // set the loading to false
        setisLoading(false);
      });
  }, []);

  if (isLoading) return <Loading size={Width * 0.15} />;

  return (
    <View>
      <Search placeholder={'Search Followers'} showFilterIcon={false} />
      <FlatList
        data={followers}
        renderItem={({item}: any) => (
          <Card
            data={item.follower_id}
            id={item.id}
            screens={'Followers'}
            showModal={() => null}
          />
        )}
        keyExtractor={(item: any, _) => `${item.id}`}
      />
    </View>
  );
};

const Following: FC = () => {
  const [isLoading, setisLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [unFollowData, setUnFollowModalData] = useState({
    show: false,
    id: '', // id of the user
    description: '',
  });

  useEffect(() => {
    Axios.get('/user/following')
      .then(result => {
        setFollowing(result.data);
      })
      .then(() => {
        // set the loading to false
        setisLoading(false);
      });
  }, []);

  if (isLoading) return <Loading size={Width * 0.15} />;

  return (
    <View>
      {/* un-follow modal  */}
      <FollowingModal
        heading={'UnFollow'}
        unFollow={unFollowData}
        toggleModal={() =>
          setUnFollowModalData(props => {
            return {
              ...props,
              show: !props.show,
            };
          })
        }
      />
      <Search placeholder={'Search Following'} showFilterIcon={false} />
      <FlatList
        data={following}
        keyExtractor={(item: any, _) => `${item.id}`}
        renderItem={({item}: any) => (
          <Card
            data={item?.followed_id}
            id={item.id}
            screens={'Following'}
            showModal={() => {
              // show the modal
              setUnFollowModalData(props => {
                return {
                  id: item.followed_id.id,
                  show: true,
                  description: `Are you sure that you want to unfollow  @${item.followed_id.username}?`,
                };
              });
            }}
          />
        )}
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
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: darkColors.LIGHT_BACKGROUND}}
            style={{backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR}}
            activeColor={darkColors.TEXT_COLOR}
            inactiveColor={darkColors.SHADOW_COLOR}
          />
        )}
        keyboardDismissMode={'auto'}
      />
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
    flex: 0.7,
    justifyContent: 'center',
  },
  cardTextName: {
    fontSize: Sizes.normal,
    color: darkColors.TEXT_COLOR,
  },
  cardTextUserName: {
    fontSize: Sizes.normal * 0.9,
    color: darkColors.TEXT_COLOR,
  },
  cardIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
