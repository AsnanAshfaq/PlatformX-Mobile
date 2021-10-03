import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Workshop from '../../Screens/Organization/Workshop/Index';
const WorkshopScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'TabScreen'}>
      <Stack.Screen name={'TabScreen'} component={Workshop} />
    </Stack.Navigator>
  );
};

export default WorkshopScreens;

const styles = StyleSheet.create({});
