import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Project from '../../Screens/Organization/Project/Index';
const HackathonScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'TabScreen'}>
      <Stack.Screen name={'TabScreen'} component={Project} />
    </Stack.Navigator>
  );
};

export default HackathonScreens;

const styles = StyleSheet.create({});
