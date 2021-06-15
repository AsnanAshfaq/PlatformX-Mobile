import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
// importing screens
import Post from '../Screens/Post/Index';
import CreatePost from '../Screens/Post/CreatePost';
import Hackathon from '../Screens/Hackathons';
import Workshop from '../Screens/Workshops';
import Project from '../Screens/Projects';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Width} from '../Constants/Size';
import CustomDrawer from '../Components/CustomDrawer';
import MyProfile from '../Screens/Profile/Index';
import Followers from '../Screens/Profile/Followers';
import Following from '../Screens/Profile/Following';
// Auth screens
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp';
import Notification from '../Screens/Notification/Notification';
import Chat from '../Screens/Chat/Chat';

// declaring navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const config = {
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

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = Width * 0.07;

          if (route.name === 'Post') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={ICON_SIZE} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: darkColors.TAB_BAR_ACTIVE_COLOR,
        inactiveTintColor: darkColors.TAB_BAR_INACTIVE_COLOR,
        iconStyle: {color: darkColors.TAB_BAR_ICON_COLOR},
        keyboardHidesTabBar: true,
        // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
        style: {
          backgroundColor: darkColors.BACKGROUND_COLOR,
        },
      }}>
      <Tab.Screen
        name="Post"
        component={Post}
        options={{tabBarLabel: 'Home'}}
        // options={{
        //   tabBarBadge: 1,
        //   tabBarBadgeStyle: {
        //     backgroundColor: darkColors.BADGE_COLOR,
        //   },
        // }}
      />
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="Projects" component={Project} />
    </Tab.Navigator>
  );
};

const ProfileScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Home"
        component={MyProfile}
        options={{
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Following"
        component={Following}
        options={{
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
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
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
};

const AuthScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'SignIn'}>
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
    </Stack.Navigator>
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
        screenOptions={{
          header: () => null,
          animationEnabled: true,
        }}>
        <Stack.Screen name="Main" component={DrawerScreens} />
        <Stack.Screen name="Create_Post" component={CreatePost} />
        {/* <Stack.Screen component={ProfileScreens} name={'Profile'} /> */}
        {/* <Stack.Screen name="Auth" component={AuthScreens} /> */}
        {/* <Stack.Screen name="TabScreens" component={TabScreens} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
