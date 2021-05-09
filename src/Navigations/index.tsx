import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
// importing screens
import Post from '../Screens/Posts';
import Hackathon from '../Screens/Hackathons';
import Workshop from '../Screens/Workshops';
import Project from '../Screens/Projects';

// declaring navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

const DrawerScreens = () => {
  return (
    <Drawer.Navigator initialRouteName="Post" openByDefault={true}>
      <Drawer.Screen name="Post" component={Post} />
      <Drawer.Screen name="Workshop" component={Workshop} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        {/* <Stack.Screen name="DrawerScreens" component={DrawerScreens} /> */}
        <Stack.Screen name="TabScreens" component={TabScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
