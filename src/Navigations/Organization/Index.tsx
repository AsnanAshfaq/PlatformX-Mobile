import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrganizationDrawerScreens from './Drawer';
import InternshipScreens from './Internship';
import HackathonSubscription from './Subscription';
import HackahtonScreens from './Hackathon';
import WorkshopScreens from './Workshop';
import FYPScreens from './FYP';
import Settings from './Settings';
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
      <Stack.Screen name="HackahtonScreens" component={HackahtonScreens} />
      <Stack.Screen name="WorkshopScreens" component={WorkshopScreens} />
      <Stack.Screen name="InternshipScreens" component={InternshipScreens} />
      <Stack.Screen name="FYPScreens" component={FYPScreens} />
      <Stack.Screen
        name={'HackathonSubscription'}
        component={HackathonSubscription}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default OrganizationScreens;
