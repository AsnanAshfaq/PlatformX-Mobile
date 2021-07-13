import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MjYyOTQ0LCJqdGkiOiJjOTk1NjFhYjNkM2U0OWY4OWFiYmM5MjZlZWM1YWE4MCIsInVzZXJfaWQiOiJkMzY0MjMxZC00MGJlLTQyN2EtODFiNC05OWMwYzZiYTAzZDcifQ.pQEz0U7K4Wa3cSJulzeP_sA9UV-A__O6mKed-wonABI';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
