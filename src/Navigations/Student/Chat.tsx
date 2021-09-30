import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../../Screens/Chat/ChatList';
import Chat from '../../Screens/Chat/Chat';

const Stack = createStackNavigator();

const ChatScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'ChatList'}>
      <Stack.Screen name={'ChatList'} component={ChatList} />
      <Stack.Screen name={'ChatScreen'} component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatScreens;
