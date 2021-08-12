import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4ODM1Njc0LCJqdGkiOiJhNTllNmJkOTM1YmE0MDI3YjVmZDZkMzY3MDk2ZWQwYSIsInVzZXJfaWQiOiI1NmU1M2M1MS0xOTBmLTRhYTktYjljZS03NzdmOTNkYTRkMDcifQ.ZO2YbCRaqmPJdmW26WXgSk0EYDso-kXEdSlGGj7syio';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
