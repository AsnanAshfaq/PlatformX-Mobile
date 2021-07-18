import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2NzA4ODIxLCJqdGkiOiJhZTBiM2M0NTA0ZTQ0ZjQ2OGI4MmNjNjJkZTdjMmY2ZiIsInVzZXJfaWQiOiJjZDRkY2QwNS1iYzk3LTQ4MmYtOTEyOC02ZGM4NDBiYzA3YmYifQ.TtrY4Fd3UiZmgp-hfe9OCunZEiCWt-MSZlJK2VE9oek';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
