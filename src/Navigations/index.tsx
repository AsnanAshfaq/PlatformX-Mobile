import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
// importing screens
import TabScreens from './Tab';
import Create_EditPost from '../Screens/Post/Create_EditPost';

import Workshop from '../Screens/Workshop/Index';
import Project from '../Screens/Project/Index';
import CustomDrawer from '../Components/CustomDrawer';
import ProfileScreens from './Profile';
import Notification from '../Screens/Notification/Notification';
import Chat from '../Screens/Chat/Chat';
import ViewHackathon from '../Screens/Hackathon/ViewHackathon';
import RegisterHackathon from '../Screens/Hackathon/Register';
// importing Auth screen stack
import AuthScreens from './Auth';
// other imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import EditPost from '../Screens/Post/EditPost';

// declaring navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      openByDefault={false}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: darkColors.DRAWER_BACKGROUND_COLOR,
        width: Width * 0.65,
        // borderBottomRightRadius: 30
        // borderTopRightRadius: 30,
        borderColor: darkColors.DRAWER_BACKGROUND_COLOR,
      }}
      // overlayColor={'grey'}
      drawerType={'slide'}>
      <Drawer.Screen name="Tabs" component={TabScreens} />
      <Drawer.Screen name="Workshop" component={Workshop} />
      <Drawer.Screen name="Profile_Home" component={ProfileScreens} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: darkColors.BACKGROUND_COLOR,
          border: '#fff',
          card: '#fff',
          notification: '#fff',
          primary: '#fff',
          text: '#fff',
        },
        dark: false,
      }}>
      <Stack.Navigator
        screenOptions={({navigation}) => {
          return {
            header: () => null,
            animationEnabled: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            detachPreviousScreen: !navigation.isFocused(),
          };
        }}>
        <Stack.Screen name="Main" component={DrawerScreens} />
        <Stack.Screen name="Create_Edit_Post" component={Create_EditPost} />
        <Stack.Screen name="Edit_Post" component={EditPost} />
        <Stack.Screen name="View_Hackathon" component={ViewHackathon} />
        <Stack.Screen name="Register_Hackathon" component={RegisterHackathon} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notification" component={Notification} />
        {/* <Stack.Screen name="Profile" component={ProfileScreens} /> */}
        {/* <Stack.Screen name="Auth" component={AuthScreens} /> */}
        {/* <Stack.Screen name="TabScreens" component={TabScreens} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
