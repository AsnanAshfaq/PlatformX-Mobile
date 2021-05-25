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
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomHeader from '../../Components/CustomHeader';
import PostCard from '../../Components/PostCard';
import {darkColors} from '../../Constants/Colors';
import {postData, profileData} from '../../Constants/Sample';
import {Height, Sizes, Width} from '../../Constants/Size';

type Props = {
  label: string;
  value: number;
  onPress: () => void;
};
const Card: FC<Props> = ({label, value, onPress}) => {
  return (
    <View style={styles.keyValueContainer}>
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
        onBackPress={() => console.log('Pressed on back button')}
      />
      <ScrollView ref={scrollViewRef}>
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
            value={profileData.followers}
            onPress={() => console.log('Pressed')}
          />
          <Card
            label={'Following'}
            value={profileData.following}
            onPress={() => console.log('Pressed')}
          />
        </View>

        {/* education-skills-interest section */}
        <View style={{marginLeft: 10}}>
          <Text style={styles.label}>
            Lives in
            <Text style={styles.value}>
              {'  '}
              {profileData.lives_in}{' '}
            </Text>
          </Text>
          <Text style={styles.label}>
            Education at
            <Text style={styles.value}>
              {'  '}
              {profileData.education}{' '}
            </Text>
          </Text>
          <Text style={styles.label}>
            Gender
            <Text style={styles.value}>
              {'  '}
              {profileData.gender}{' '}
            </Text>
          </Text>
          {/* <View style={styles.column}>
            <Text style={styles.label}>Skills </Text>
            <View style={styles.column}>
              {profileData.skills.map(skill => (
                <View key={skill.tag} style={styles.row}>
                  <Text style={styles.label}>{skill.tag}</Text>
                  <Text style={styles.value}>{skill.experience}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Interests </Text>
            <View style={styles.column}>
              {profileData.interests.map(interest => (
                <Text style={styles.value}>{interest}</Text>
              ))}
            </View>
          </View> */}
        </View>

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
            <PostCard
              key={post.id}
              user_name={post.user_name}
              date={post.date}
              description={post.description}
              image={post.image}
              screen={'Home'}
            />
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
    backgroundColor: darkColors.SHADOW_COLOR,
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
