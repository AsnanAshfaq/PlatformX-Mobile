import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../Components/CustomHeader';
import PostCard from '../../Components/PostCard';
import Search from '../../Components/Search';
import UserCard from '../../Components/UserCard';
import {darkColors} from '../../Constants/Colors';
import {profileData, postData} from '../../Constants/Sample';
import {Sizes} from '../../Constants/Size';

type props = {
  navigation: any;
};
const Followers: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={`${profileData.followers.length} Followers`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <Search placeholder={'Search Followers'} showFilterIcon={false} />
        {profileData.followers.map(profile => (
          <UserCard
            navigations={navigation}
            full_name={profile.full_name}
            user_image={profile.user_image}
            user_name={profile.user_name}
            key={profile.user_name + profile.full_name}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  parent: {flex: 1},
});
