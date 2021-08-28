import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp';
import ResetPassword from '../Screens/Auth/ResetPassword';

const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'SignIn'}>
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthScreens;
