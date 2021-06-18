import React, {useEffect, useState} from 'react';
import Navigation from './src/Navigations';
import {useStateValue} from './src/Store/StateProvider';
import axios from './src/Utils/Axios';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    // get user type and set it into global state
    axios.get('/user/').then(result => {
      if (result.data.student) {
        dispatch({type: 'SET_USER_TYPE', payload: 'student'});
      } else {
        dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
      }
      setLoading(false);
    });
  }, []);

  if (!Loading)
    return (
      <MenuProvider>
        <Navigation />
      </MenuProvider>
    );
  return null;
};

export default App;
