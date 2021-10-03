import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Internship from '../../Screens/Organization/Internship/Index';
const HackathonScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'TabScreen'}>
      <Stack.Screen name={'TabScreen'} component={Internship} />
    </Stack.Navigator>
  );
};

export default HackathonScreens;

const styles = StyleSheet.create({});
