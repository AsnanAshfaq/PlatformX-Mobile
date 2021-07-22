import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3MDQzNTEzLCJqdGkiOiI0MmUzNzk2YjVjMWI0OTZmOTFjNzdiYzUzODM2MDc5NCIsInVzZXJfaWQiOiJkMzY0MjMxZC00MGJlLTQyN2EtODFiNC05OWMwYzZiYTAzZDcifQ.Z3-4FEHfvWnWZvfNH1SY_Dan6OLK305PaaY5SsgrLj0';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
