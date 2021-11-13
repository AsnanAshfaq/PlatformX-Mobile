//Sreens
// view

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewFYP from '../../Screens/Student/FYP/View';
const FYPScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'View_FYP'}>
      <Stack.Screen name="View_FYP" component={ViewFYP} />
    </Stack.Navigator>
  );
};

export default FYPScreens;
