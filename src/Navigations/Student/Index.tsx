import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StudentDrawerScreens from './Drawer';
import Create_EditPost from '../../Screens/Student/Post/CreateEdit';
import Chat from './Chat';
import Notification from './Notification';
import Settings from './Settings';
import HackahtonScreens from './Hackathon';
import WorkshopScreens from './Workshop';
import FYPScreens from './FYP';
import LinkedInSignIn from '../../Screens/Student/LinkedInSignIn';
const Stack = createStackNavigator();

const StudentScreens = () => {
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
      <Stack.Screen name="Main" component={StudentDrawerScreens} />
      <Stack.Screen name="Create_Edit_Post" component={Create_EditPost} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="HackahtonScreens" component={HackahtonScreens} />
      <Stack.Screen name="WorkshopScreens" component={WorkshopScreens} />
      <Stack.Screen name="FYPScreens" component={FYPScreens} />
      <Stack.Screen name="LinkedInSignIn" component={FYPScreens} />
    </Stack.Navigator>
  );
};

export default StudentScreens;
