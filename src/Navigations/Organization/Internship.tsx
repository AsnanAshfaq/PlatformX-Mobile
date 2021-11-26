import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Internship from '../../Screens/Organization/Internship';
import View_Internship from './Tabs/Internship';
import CreateEditInternship from '../../Screens/Organization/Internship/CreateEdit';
const InternshipScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'InternshipTab'}>
      <Stack.Screen name={'InternshipTab'} component={View_Internship} />
      <Stack.Screen
        name={'Create_Edit_Internship'}
        component={CreateEditInternship}
      />
      {/* <Stack.Screen name="View_Internship" component={ViewFYP} /> */}
    </Stack.Navigator>
  );
};

export default InternshipScreens;

const styles = StyleSheet.create({});
