//TODO:
// when user opens the app
// get "access" token from local storage
// if token != ''
// make api call to validate token
// if token is valid, go to main screen
// else go to auth screens

import React, {useEffect, useState} from 'react';
import Navigation from './src/Navigations/index';
import {useStateValue} from './src/Store/StateProvider';
import axios from './src/Utils/Axios';
import {MenuProvider} from 'react-native-popup-menu';
import Splash from './src/Components/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {darkColors} from './src/Constants/Colors';
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
          const userReseponse = await axios.get('/user/');
          if (userReseponse.status === 200) {
            // get result and store in context state
            dispatch({type: 'SET_SIGN_IN', payload: true});
            if (userReseponse.data.student) {
              dispatch({type: 'SET_USER_TYPE', payload: 'student'});
              // store student related data
              const userData = {
                firstName: userReseponse.data.first_name,
                lastName: userReseponse.data.last_name,
                email: userReseponse.data.email,
                userName: userReseponse.data.username,
                profilePic: userReseponse.data.user_profile_image.path,
              };
              dispatch({type: 'SET_USER', payload: userData});
            } else if (userReseponse.data.organization) {
              dispatch({type: 'SET_USER_TYPE', payload: 'organization'});

              //TODO: add organization data here
            }
          }
          setLoading(false);
        } catch (error) {
          // set sign in state
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

    getUserType();
  }, [dispatch]);

  if (!Loading)
    return (
      <MenuProvider
        customStyles={{
          menuProviderWrapper: {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          },
        }}>
        <Navigation />
      </MenuProvider>
    );
  return <Splash />;
};

export default App;
