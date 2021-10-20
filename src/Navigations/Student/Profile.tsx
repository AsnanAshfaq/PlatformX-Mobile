import React from 'react';
import MyProfile from '../../Screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from '../../Screens/Profile/Student/Tab';
import {config} from '../index';
import EditProfile from '../../Screens/Profile/Student/EditProfile';

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
      <Stack.Screen
        name="Edit_Profile"
        component={EditProfile}
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
