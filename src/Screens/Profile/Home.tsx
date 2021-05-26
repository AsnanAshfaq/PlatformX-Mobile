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

import React, {FC, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomHeader from '../../Components/CustomHeader';
import PostCard from '../../Components/PostCard';
import {darkColors} from '../../Constants/Colors';
import {postData, profileData} from '../../Constants/Sample';
import {Height, Sizes, Width} from '../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const Home: FC<props> = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const myPostRef = useRef(null);

  // animate to post section
  const animteScrollView = () => {
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

  return (
    <View style={styles.parent}>
      <CustomHeader
        title={`@${profileData.user_name}`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
        {/* background and profile image section  */}
        <View style={styles.center}>
          <Image
            source={{uri: profileData.background_image}}
            style={styles.background_image}
            resizeMode={'cover'}
          />
          <Image
            source={{uri: profileData.profile_image}}
            style={styles.profile_image}
            resizeMode={'cover'}
          />
        </View>

        {/* name-username-bio section  */}
        <View style={styles.personalInfoContainer}>
          <Text style={styles.name}>
            {profileData.first_name} {profileData.last_name}
          </Text>
          <Text style={styles.user_name}>@{profileData.user_name}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>

        {/* post-followers-followings section  */}
        <View style={styles.card}>
          <Card
            label={'Posts'}
            value={postData.length}
            onPress={animteScrollView}
          />
          <Card
            label={'Followers'}
            value={profileData.followers.length}
            onPress={() => navigation.navigate('Followers')}
          />
          <Card
            label={'Following'}
            value={profileData.following.length}
            onPress={() => navigation.navigate('Following')}
          />
        </View>

        {/* education-lives in-gender section */}

        <UserInfo
          icon={'location-outline'}
          label={'Lives in'}
          value={profileData.lives_in}
        />
        <UserInfo
          icon={'book-outline'}
          label={'Education'}
          value={profileData.education}
        />
        <UserInfo
          icon={'calendar-outline'}
          label={'Date of Birth'}
          value={profileData.date_of_birth}
        />
        {/* view profile button  */}
        <TouchableOpacity
          style={styles.viewButtonContainer}
          onPress={animteScrollView}>
          <Text style={styles.viewButtonText}>View Profile</Text>
        </TouchableOpacity>
        <View style={styles.activitiesContainer}>
          <TouchableOpacity style={styles.activitiesButtonContainer}>
            <Text style={styles.activityButtonText}>My Activities</Text>
          </TouchableOpacity>
        </View>
        {/* my posts section  */}
        <View ref={myPostRef}>
          <View style={styles.myPostContainer}>
            <Text style={styles.myPostText}>My Posts</Text>
          </View>
          {postData.map(post => (
            <PostCard key={post.id} postDetail={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
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
    bottom: 30,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: darkColors.SHADOW_COLOR,
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

export default Home;
