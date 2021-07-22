import React from 'react';
import MyProfile from '../Screens/Profile/Index';
import {createStackNavigator} from '@react-navigation/stack';
import Followers from '../Screens/Profile/Followers';
import Tab from '../Screens/Profile/Tab';
import Following from '../Screens/Profile/Following';
import {config} from './Index';

const Stack = createStackNavigator();

const ProfileScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Home"
        component={MyProfile}
        options={{
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Follow_Tab"
        component={Tab}
        options={{
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      {/* <Stack.Screen
        name="Following"
        component={Following}
        options={{
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ProfileScreens;
