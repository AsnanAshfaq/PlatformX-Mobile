import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI5MTk4MTYxLCJqdGkiOiI3MWVlNThjN2M3MjM0MTJlYmEyYTY5ZjgxNjIxNWVmMiIsInVzZXJfaWQiOiJjZDRkY2QwNS1iYzk3LTQ4MmYtOTEyOC02ZGM4NDBiYzA3YmYifQ.d8wCgKeEhXannljuVh_FW6O0_xfiHO9Zr6q4EEyHFF0';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
