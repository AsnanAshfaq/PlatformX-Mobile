import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Hackathon from '../../Screens/Organization/Hackathon/Index';
import ViewHackathon from '../../Screens/Organization/Hackathon/View';
import CreateEditHackathon from '../../Screens/Organization/Hackathon/CreateEdit';
const HackathonScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'TabScreen'}>
      <Stack.Screen name={'TabScreen'} component={Hackathon} />
      <Stack.Screen name={'View_Hackathon'} component={ViewHackathon} />
      <Stack.Screen
        name={'Create_Edit_Hackathon'}
        component={CreateEditHackathon}
      />
    </Stack.Navigator>
  );
};

export default HackathonScreens;

const styles = StyleSheet.create({});
