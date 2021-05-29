import React, {FC} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';

import CustomHeader from '../../Components/CustomHeader';
import PostCard from '../../Components/PostCard';
import Search from '../../Components/Search';
import UserCard from '../../Components/UserCard';
import {darkColors} from '../../Constants/Colors';
import {postData, profileData} from '../../Constants/sample';
import {Sizes} from '../../Constants/Size';

type props = {
  navigation: any;
};
const Following: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={`${profileData.following.length} Following`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <Search placeholder={'Search Following'} showFilterIcon={false} />
        {profileData.following.map(profile => (
          <UserCard
            navigations={navigation}
            user={profile}
            key={profile.user_name + profile.full_name}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  parent: {flex: 1},
});
