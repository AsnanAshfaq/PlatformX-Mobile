import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  // headers: {
  //   Authorization: 'Bearer' + Token,
  // },
});

// adding token from local storage in axios headers
instance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('access');
  if (token != null && token != '')
    config.headers.Authorization = 'Bearer ' + token;
  return config;
});
export default instance;
