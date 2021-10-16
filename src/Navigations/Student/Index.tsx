import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StudentDrawerScreens from './Drawer';
import Create_EditPost from '../../Screens/Student/Post/CreateEdit';
import Chat from './Chat';
import Notification from './Notification';
import Settings from './Settings';
import ViewHackathon from '../../Screens/Student/Hackathon/View';
import RegisterHackathon from '../../Screens/Student/Hackathon/Register';
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
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
      <Stack.Screen name="Register_Hackathon" component={RegisterHackathon} />
      <Stack.Screen name="View_Hackathon" component={ViewHackathon} />
    </Stack.Navigator>
  );
};

export default StudentScreens;
