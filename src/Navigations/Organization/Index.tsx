import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrganizationDrawerScreens from './Drawer';
import CreateEditHackathon from '../../Screens/Organization/Hackathon/CreateEdit/index';
import HackathonSubscription from './Subscription';
import HackahtonScreens from './Hackathon';
import WorkshopScreens from './Workshop';
import FYPScreens from './FYP';
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
      <Stack.Screen name="FYPScreens" component={FYPScreens} />
      <Stack.Screen
        name={'HackathonSubscription'}
        component={HackathonSubscription}
      />
    </Stack.Navigator>
  );
};

export default OrganizationScreens;
