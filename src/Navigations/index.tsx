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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Width} from '../Constants/Size';
import CustomDrawer from '../Components/CustomDrawer';
// declaring navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = Width * 0.07;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          }
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={ICON_SIZE}
              color={darkColors.BACKGROUND_COLOR}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: darkColors.BACKGROUND_COLOR,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Post} />
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="Projects" component={Project} />
    </Tab.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      openByDefault={false}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={TabScreens} />
      <Drawer.Screen name="Workshop" component={Workshop} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Main" component={DrawerScreens} />
        {/* <Stack.Screen name="TabScreens" component={TabScreens} /> */}
      </Stack.Navigator>
      {/* <Drawer.Navigator
        initialRouteName="Post"
        openByDefault={true}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Post" component={Post} />
        <Drawer.Screen name="Workshop" component={Workshop} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default Navigation;
