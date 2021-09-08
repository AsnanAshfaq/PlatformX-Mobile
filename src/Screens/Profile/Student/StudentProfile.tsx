/* eslint-disable react-native/no-inline-styles */
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
  TouchableWithoutFeedback,
  ToastAndroid,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import PostCard from '../../../Components/PostCard';
import {darkColors} from '../../../Constants/Colors';
import {Height, Sizes, Width} from '../../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PROFILE_IMAGE, BACKGROUND_IMAGE} from '../../../Constants/sample';
import axios from '../../../Utils/Axios';
import Loading from '../../../Components/Loading';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import BottomImageModal from '../../../Modals/BottomImageModal';

const ICON_SIZE = Width * 0.06;

const CAMERA_ICON_SIZE = Width * 0.085;

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

type cardProps = {
  label: string;
  value: number;
  onPress: () => void;
};

const Card: FC<cardProps> = ({label, value, onPress}) => {
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
  // states
  const [ProfileData, setProfileData] = useState<any>(null);
  const [Post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Refresh, setRefresh] = useState(false);

  const [LoadBackgroundImage, setLoadBackgroundImage] = useState(true);
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [Modal, setModal] = useState<{
    isShow: boolean;
    type: 'profile' | 'background' | '';
    isImageSet: boolean;
  }>({
    isShow: false,
    type: '',
    isImageSet: false,
  });

  // ref
  const scrollViewRef = useRef<any>(null);
  const myPostRef = useRef<any>(null);

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

  const getUserDetails = async () => {
    axios
      .get('/user/')
      .then(result => setProfileData(result.data))
      .then(() => {
        console.log(ProfileData);
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
  };

  const onRefresh = () => {
    setRefresh(true);
    getUserDetails().then(() => {
      setRefresh(false);
    });
  };

  const handleImagePickerModal = (
    type: 'profile' | 'background',
    isImageSet: boolean,
  ) => {
    setModal({isShow: true, type: type, isImageSet: isImageSet});
  };

  useEffect(() => {
    // get user data from data base
    getUserDetails();
  }, []);

  if (!loading) {
    return (
      <View style={styles.parent}>
        <CustomHeader
          title={`@${ProfileData?.username}`}
          navigation={navigation}
          back
          onBackPress={() => navigation.goBack()}
        />

        <BottomImageModal
          isShow={Modal.isShow}
          toggleModal={() =>
            setModal(props => {
              return {
                isShow: !props.isShow,
                type: '',
                isImageSet: false,
              };
            })
          }
          type={Modal.type}
          isImageSet={Modal.isImageSet}
        />
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={onRefresh}
              colors={[darkColors.TEXT_COLOR]}
              progressBackgroundColor={darkColors.SHADOW_COLOR}
              progressViewOffset={20}
              size={Sizes.large}
            />
          }>
          {/* background and profile image section  */}
          <View style={styles.center}>
            <View>
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
              <TouchableWithoutFeedback
                onPress={() =>
                  handleImagePickerModal(
                    'background',
                    ProfileData?.user_background_image ? true : false,
                  )
                }>
                <Ionicons
                  name={'camera'}
                  size={CAMERA_ICON_SIZE}
                  color={darkColors.ICON_COLOR}
                  style={styles.backgroundCameraIcon}
                />
              </TouchableWithoutFeedback>
            </View>
            <View>
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
                  !LoadProfileImage &&
                    ProfileData?.user_profile_image && {
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
              {/* edit photo icon here  */}
              <TouchableWithoutFeedback
                onPress={() =>
                  handleImagePickerModal(
                    'profile',
                    ProfileData?.user_profile_image ? true : false,
                  )
                }>
                <Ionicons
                  name={'camera'}
                  size={CAMERA_ICON_SIZE}
                  color={darkColors.ICON_COLOR}
                  style={styles.profileCameraIcon}
                />
              </TouchableWithoutFeedback>
            </View>
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
              onPress={() =>
                navigation.navigate('Follow_Tab', {
                  userName: ProfileData?.username,
                  activeScreen: 'Followers',
                })
              }
            />
            <Card
              label={'Following'}
              value={
                ProfileData?.follower_id.length !== 0
                  ? ProfileData?.follower_id.length
                  : 0
              }
              onPress={() =>
                navigation.navigate('Follow_Tab', {
                  userName: ProfileData?.username,
                  activeScreen: 'Following',
                })
              }
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
            onPress={() => navigation.navigate('View_Profile')}>
            <Text style={styles.viewButtonText}>View Profile</Text>
          </TouchableOpacity>
          {/* activities button  */}
          <View style={styles.activitiesContainer}>
            <TouchableOpacity style={styles.activitiesButtonContainer}>
              <Text style={styles.activityButtonText}>My Activities</Text>
            </TouchableOpacity>
          </View>
          {/* if user has posted something then show my post section*/}
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
                renderItem={({item: post, index, separators}: any) => (
                  <PostCard
                    key={post.id}
                    postDetail={post}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          ) : (
            <View style={styles.noPostContainer}>
              <Text style={styles.noPostText}>No posts yet :)</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  return <Loading size={'large'} />;
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
  backgroundCameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: -20,
  },
  profile_image: {
    width: Width * 0.45,
    height: Width * 0.45,
    position: 'relative',
    bottom: 30,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 25,
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
  noPostContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noPostText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
  },
});

export default StudentProfile;
