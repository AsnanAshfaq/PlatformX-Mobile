import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4OTU0Mjk0LCJqdGkiOiIwMmY5ZWE3YjM4YWY0OTQ4Yjk4YTU4MDIzMDI1MWJlZiIsInVzZXJfaWQiOiJkMzY0MjMxZC00MGJlLTQyN2EtODFiNC05OWMwYzZiYTAzZDcifQ.ZvtGVZoSddLMwiu72xLY45oZkc5xFq0BHKCwy4HVfZw';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
