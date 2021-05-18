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
import CustomHeader from '../../Components/CustomHeader';
import {darkColors} from '../../Constants/Colors';
import {profileData} from '../../Constants/Sample';

type props = {
  navigation: any;
};
const Home: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={profileData.user_name}
        navigation={navigation}
        back
      />
      <ScrollView>
        {/* background and profile images  */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            source={{uri: profileData.background_image}}
            style={{width: 200, height: 200, justifyContent: 'flex-end'}}>
            <Image
              source={{uri: profileData.profile_image}}
              style={{width: 100, height: 100}}
            />
          </ImageBackground>
        </View>

        <View></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
});

export default Home;
