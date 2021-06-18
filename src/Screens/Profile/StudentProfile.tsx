//TODO:
// user background image
// user profile image
// user post's, follower's, following's
// user first name + last name , user name
// user user_name
// user bio
// user github link
// user linedin link
// edit profile button

import React, {FC, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import PostCard from '../../Components/PostCard';
import {darkColors} from '../../Constants/Colors';
import {postData, profileData} from '../../Constants/sample';
import {Height, Sizes, Width} from '../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PROFILE_IMAGE, BACKGROUND_IMAGE} from '../../Constants/sample';
import axios from '../../Utils/Axios';
import {BASE_URL} from 'react-native-dotenv';

const ICON_SIZE = Width * 0.06;

const UserInfo = ({icon, label, value}) => {
  return (
    <View style={styles.userInfoContainer}>
      <Ionicons name={icon} size={ICON_SIZE} color={darkColors.ICON_COLOR} />
      <Text style={styles.label}>
        {'  '}
        {label}
        {'  '}
        <Text style={styles.value}>{value}</Text>
      </Text>
    </View>
  );
};

type Props = {
  label: string;
  value: number;
  onPress: () => void;
};

const Card: FC<Props> = ({label, value, onPress}) => {
  return (
    <View
      style={[
        styles.keyValueContainer,
        {
          borderRightWidth: label === 'Posts' ? 2 : 0,
          borderRightColor: label === 'Posts' ? darkColors.SHADOW_COLOR : '',
          borderLeftWidth: label === 'Following' ? 2 : 0,
          borderLeftColor: label === 'Following' ? darkColors.SHADOW_COLOR : '',
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.center}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

type props = {
  navigation: any;
};

const StudentProfile: FC<props> = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const myPostRef = useRef(null);
  const [ProfileData, setProfileData] = useState(null);
  const [Post, setPost] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [LoadBackgroundImage, setLoadBackgroundImage] = useState(true);
  const [LoadProfileImage, setLoadProfileImage] = useState(true);

  // animate to post section
  const animteView = () => {
    if (scrollViewRef.current && myPostRef.current) {
      myPostRef?.current?.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef?.current?.scrollTo({
          x: 0,
          y: y,
          animated: true,
        });
      });
    }
  };

  useEffect(() => {
    // get user data from data base
    axios
      .get('/user/')
      .then(result => setProfileData(result.data))
      .then(() => {
        // get posts related to current user
        axios
          .get('/api/post/')
          .then(result => setPost(result.data))
          .then(() => setLoading(false));
      })
      .catch(error => {
        // error while fetching data
        ToastAndroid.show('Error while fetching data', 1500);
      });
  }, []);

  if (!Loading) {
    return (
      <View style={styles.parent}>
        <CustomHeader
          title={`@${ProfileData?.username}`}
          navigation={navigation}
          back
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
          {/* background and profile image section  */}
          <View style={styles.center}>
            <Image
              source={{
                uri: LoadBackgroundImage
                  ? BACKGROUND_IMAGE
                  : ProfileData?.user_background_image
                  ? ProfileData?.user_background_image.path
                  : BACKGROUND_IMAGE,
              }}
              style={styles.background_image}
              resizeMode={'cover'}
              onLoadEnd={() => setLoadBackgroundImage(false)}
              onError={() => {
                setLoadProfileImage(true);
                ToastAndroid.show("Couldn't load background image", 1500);
              }}
            />
            <Image
              source={{
                uri: LoadProfileImage
                  ? PROFILE_IMAGE
                  : ProfileData?.user_profile_image
                  ? BASE_URL + ProfileData?.user_profile_image.path
                  : PROFILE_IMAGE,
              }}
              style={[
                styles.profile_image,
                !LoadProfileImage && {
                  bottom: 30,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: darkColors.SHADOW_COLOR,
                },
              ]}
              resizeMode={'cover'}
              // onLoad={() => setLoadProfileImage(true)}
              onLoadEnd={() => setLoadProfileImage(false)}
              onError={() => {
                setLoadProfileImage(true);
                ToastAndroid.show("Couldn't load profile image", 1500);
              }}
            />
          </View>

          {/* name-username-bio section  */}
          <View style={styles.personalInfoContainer}>
            <Text style={styles.name}>
              {ProfileData?.first_name} {ProfileData?.last_name}
            </Text>
            <Text style={styles.user_name}>@{ProfileData?.username}</Text>
            <Text style={styles.bio}>{ProfileData?.student?.bio}</Text>
          </View>

          {/* post-followers-followings section  */}
          <View style={styles.card}>
            <Card
              label={'Posts'}
              value={Post.length !== 0 ? Post.length : 0}
              onPress={() => animteView()}
            />
            <Card
              label={'Followers'}
              value={
                ProfileData?.followed_id.length !== 0
                  ? ProfileData?.followed_id.length
                  : 0
              }
              onPress={() => navigation.navigate('Followers')}
            />
            <Card
              label={'Following'}
              value={
                ProfileData?.follower_id.length !== 0
                  ? ProfileData?.follower_id.length
                  : 0
              }
              onPress={() => navigation.navigate('Following')}
            />
          </View>

          {/* education-lives in-gender section */}

          <UserInfo
            icon={'location-outline'}
            label={'Lives in'}
            value={ProfileData?.student?.lives_in}
          />
          <UserInfo
            icon={'book-outline'}
            label={'Education'}
            value={ProfileData?.student?.education}
          />
          {/* <UserInfo
            icon={'calendar-outline'}
            label={'Date of Birth'}
            value={profileData.date_of_birth}
          /> */}
          {/* view profile button  */}
          <TouchableOpacity
            style={styles.viewButtonContainer}
            onPress={() => console.log('Go to main profile')}>
            <Text style={styles.viewButtonText}>View Profile</Text>
          </TouchableOpacity>
          <View style={styles.activitiesContainer}>
            <TouchableOpacity style={styles.activitiesButtonContainer}>
              <Text style={styles.activityButtonText}>My Activities</Text>
            </TouchableOpacity>
          </View>
          {/* if user has posted something show my post section*/}
          {Post.length !== 0 ? (
            <View ref={myPostRef}>
              <FlatList
                data={Post}
                ListHeaderComponent={() => (
                  <View style={styles.myPostContainer}>
                    <Text style={styles.myPostText}>My Posts</Text>
                  </View>
                )}
                nestedScrollEnabled
                renderItem={({item: Post, index, separators}) => (
                  <PostCard key={Post.id} postDetail={Post} />
                )}
              />
            </View>
          ) : (
            <Text>You dont have any posts yet :)</Text>
          )}
        </ScrollView>
      </View>
    );
  }
  return <Text>Loading </Text>;
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_image: {
    width: Width,
    height: Width * 0.55,
    // position: 'relative',
    // top: 100,
    // bottom: 30,
    // borderRadius: 50,
    // borderWidth: 3,
    // borderColor: darkColors.SHADOW_COLOR,
    // backgroundColor: 'red',
    // overflow: 'hidden',
  },
  profile_image: {
    width: Width * 0.37,
    height: Width * 0.37,
    position: 'relative',
    // top: 100,
    // backgroundColor: 'red',
    // overflow: 'hidden',
  },
  personalInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.5,
  },
  user_name: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    marginVertical: 5,
  },
  bio: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.small * 1.1,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    // marginHorizontal: Width * 0.2,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  keyValueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: darkColors.SHADOW_COLOR,
    margin: 2,
  },
  userInfoContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    flexDirection: 'row',
  },
  label: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
  },
  value: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  viewButtonContainer: {
    // width: Width * 0.8,
    // flex: 1,
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.SHADOW_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  viewButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
  activitiesContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  activitiesButtonContainer: {
    marginHorizontal: Width * 0.04,
    // width: Width * 0.3,
    marginVertical: 5,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: darkColors.TOMATO_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  activityButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    paddingVertical: 2,
  },
  myPostContainer: {
    paddingVertical: 5,
    marginHorizontal: Width * 0.05,
    marginVertical: 5,
    borderBottomColor: darkColors.SHADOW_COLOR,
    borderBottomWidth: 1,
  },
  myPostText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large,
  },
});

export default StudentProfile;
