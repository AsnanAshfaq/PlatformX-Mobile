import React from 'react';
import MyProfile from '../Screens/Profile/Index';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from '../Screens/Profile/Tab';
import {config} from './Index';
import ViewProfile from '../Screens/Profile/Student/ViewProfile';

const Stack = createStackNavigator();

const ProfileScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      {/* <Stack.Screen
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
      /> */}
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
        name="View_Profile"
        component={ViewProfile}
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
    </Stack.Navigator>
  );
};

export default ProfileScreens;
