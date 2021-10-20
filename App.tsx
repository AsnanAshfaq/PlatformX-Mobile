//TODO:
// when user opens the app
// get "access" token from local storage
// if token != ''
// make api call to validate token
// if token is valid, go to main screen
// else go to auth screens
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import React, {useEffect, useRef, useState} from 'react';
import Navigation from './src/Navigations/index';
import {useStateValue} from './src/Store/StateProvider';
import axios from './src/Utils/Axios';
import {MenuProvider} from 'react-native-popup-menu';
import Splash from './src/Components/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const {theme} = state;

  useEffect(() => {
    const getUserType = async () => {
      // get token from local storage
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken !== null && accessToken !== '') {
        // make api call
        try {
          const userResponse = await axios.get('/user/');
          if (userResponse.status === 200) {
            // get result and store in context state
            dispatch({type: 'SET_SIGN_IN', payload: true});
            if (userResponse.data.student) {
              // store student related data
              const userData = {
                firstName: userResponse.data.first_name,
                lastName: userResponse.data.last_name,
                email: userResponse.data.email,
                userName: userResponse.data.username,
                profilePic: userResponse.data.user_profile_image.path,
              };
              dispatch({type: 'SET_USER_TYPE', payload: 'student'});
              dispatch({type: 'SET_USER', payload: userData});
            } else if (userResponse.data.organization) {
              const userData = {
                name: userResponse.data.organization.name,
                regNo: userResponse.data.organization.reg_no,
                email: userResponse.data.email,
                location: userResponse.data.organization.location,
                profilePic:
                  userResponse.data.user_profile_image !== undefined
                    ? userResponse.data.user_profile_image.path
                    : '',
              };
              dispatch({type: 'SET_USER', payload: userData});
              dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
            }
          }
          setLoading(false);
        } catch (error) {
          // set sign in state
          console.log('Error is ', error);
          dispatch({type: 'SET_USER_TYPE', payload: null});
          dispatch({type: 'SET_SIGN_IN', payload: false});
          setLoading(false);
          return Promise.reject(error);
        }
      } else {
        // set sign in state
        dispatch({type: 'SET_USER_TYPE', payload: null});
        dispatch({type: 'SET_SIGN_IN', payload: false});
        setLoading(false);
      }
    };
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

    getUserType();
  }, [dispatch]);

  if (!Loading) {
    return (
      <MenuProvider
        customStyles={{
          menuProviderWrapper: {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          },
          // backdrop: {
          //   opacity: 0.01,
          //   backgroundColor: 'grey',
          // },
        }}>
        <Navigation />
      </MenuProvider>
    );
  }
  return <Splash />;
};

export default App;
