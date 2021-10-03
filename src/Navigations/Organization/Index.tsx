import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrganizationDrawerScreens from './Drawer';
import CreateEditHackathon from '../../Screens/Organization/Hackathon/CreateEdit';

const Stack = createStackNavigator();

const OrganizationScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          header: () => null,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          detachPreviousScreen: !navigation.isFocused(),
          // animationTypeForReplace: 'push',
        };
      }}>
      <Stack.Screen name="Main" component={OrganizationDrawerScreens} />
      <Stack.Screen
        name="Create_Edit_Hackathon"
        component={CreateEditHackathon}
      />
    </Stack.Navigator>
  );
};

export default OrganizationScreens;
