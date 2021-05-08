import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Post from '../Screens/Posts';
import Hackathon from '../Screens/Hackathons';
import Workshop from '../Screens/Workshops';
import Project from '../Screens/Projects';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// declaring navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Hackathon" component={Hackathon} />
      <Tab.Screen name="Workshop" component={Workshop} />
      <Tab.Screen name="Project" component={Project} />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="TabScreens" component={TabScreens} />
        {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
