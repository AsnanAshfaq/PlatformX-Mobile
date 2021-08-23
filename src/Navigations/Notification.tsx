import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../Screens/Notification/Index';

const Stack = createStackNavigator();

const NotificationScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Notification'}>
      <Stack.Screen name={'Notification'} component={Notification} />
    </Stack.Navigator>
  );
};

export default NotificationScreens;
