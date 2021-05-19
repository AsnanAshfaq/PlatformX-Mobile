//TODO:
// user background image
// user profile image
// user post's, follower's, following's
// user first name + last name , user name
// user user_name
// user bio
// edit profile button

import React, {FC} from 'react';
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
import {darkColors} from '../../Constants/Colors';
import {profileData} from '../../Constants/Sample';
import {Sizes, Width} from '../../Constants/Size';

type Props = {
  label: string;
  value: number;
};
const KeyValue: FC<Props> = ({label, value}) => {
  return (
    <View style={styles.keyValueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
type props = {
  navigation: any;
};
const Home: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={`@${profileData.user_name}`}
        navigation={navigation}
        back
      />
      <ScrollView>
        {/* background and profile images  */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: profileData.background_image}}
            style={styles.backgroun_image}
          />
          <Image
            source={{uri: profileData.profile_image}}
            style={styles.profile_image}
          />
          {/* </ImageBackground> */}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.name}>
            {profileData.first_name} {profileData.last_name}
          </Text>
          <Text style={styles.user_name}>@{profileData.user_name}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>

        <View style={styles.card}>
          <KeyValue label={'Posts'} value={profileData.posts} />
          <KeyValue label={'Followers'} value={profileData.followers} />
          <KeyValue label={'Following'} value={profileData.following} />
        </View>

        {/* edit profile button  */}
        <TouchableOpacity style={styles.editButtonContainer}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  backgroun_image: {
    width: Width,
    height: Width * 0.55,
    position: 'relative',
    // top: 100,
    // bottom: 30,
    // borderRadius: 50,
    // borderWidth: 3,
    // borderColor: darkColors.SHADOW_COLOR,
    backgroundColor: 'red',
    overflow: 'hidden',
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
    backgroundColor: 'red',
    overflow: 'hidden',
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
  editButtonContainer: {
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
  editButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
  },
});

export default Home;
