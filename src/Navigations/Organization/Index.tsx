import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrganizationDrawerScreens from './Drawer';
import CreateEditHackathon from '../../Screens/Organization/Hackathon/CreateEdit/index';
import HackathonSubscription from './Subscription';
import HackahtonScreens from './Hackathon';
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
      {/* <Stack.Screen
        name="Create_Edit_Hackathon"
        component={CreateEditHackathon}
      /> */}
      <Stack.Screen name="HackahtonScreens" component={HackahtonScreens} />
      <Stack.Screen
        name={'HackathonSubscription'}
        component={HackathonSubscription}
      />
    </Stack.Navigator>
  );
};

export default OrganizationScreens;
