import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {profileData} from '../../Constants/Sample';
import {TabView, SceneMap} from 'react-native-tab-view';
import Followers from './Followers';
import Following from './Following';

type props = {
  navigation: any;
  screen: number | 0;
};
const TabScreens: FC<props> = ({navigation, screen}) => {
  const [index, setIndex] = useState(screen);
  const [routes] = useState([
    {key: 'followers', title: 'Followers'},
    {key: 'following', title: 'Following'},
  ]);

  const renderScene = SceneMap({
    followers: Followers,
    following: Following,
  });

  return (
    <View>
      <CustomHeader
        title={`@${profileData.user_name}`}
        navigation={navigation}
        back
        onBackPress={() => console.log('Pressed on back button')}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default TabScreens;

const styles = StyleSheet.create({});
