//TODO:
// when user opens the app
// get "access" token from local storage
// if token != ''
// make api call to validate token
// if token is valid, go to main screen, also store token in axios
// else go to auth screens

import React, {useEffect, useState} from 'react';
import Navigation from './src/Navigations/Index';
import {useStateValue} from './src/Store/StateProvider';
import axios from './src/Utils/Axios';
import {MenuProvider} from 'react-native-popup-menu';
import Splash from './src/Components/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkColors} from './src/Constants/Colors';

export let Token = '';
const App = () => {
  const [Loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getUserType = async () => {
      // get token from local storage
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken !== null && accessToken != '') {
        // make api call
        axios
          .get('/user/')
          .then(result => {
            if (result.status === 200) {
              // if token is valid
              // get result and store in context state
              if (result.data.student) {
                dispatch({type: 'SET_USER_TYPE', payload: 'student'});
              } else if (result.data.organization) {
                dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
              }
              setIsAuthenticated(true);
            }
            setLoading(false);
          })
          .catch(error => {
            setIsAuthenticated(false);
            setLoading(false);
            return Promise.reject(error);
          });
      } else {
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
            backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
          },
        }}>
        <Navigation isAuthenticated={isAuthenticated} />
      </MenuProvider>
    );
  return <Splash />;
};

export default App;
