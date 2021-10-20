import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../Screens/Student/Settings';
const Stack = createStackNavigator();

const SettingScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Index'}>
      <Stack.Screen name={'Index'} component={Index} />
    </Stack.Navigator>
  );
};

export default SettingScreens;
