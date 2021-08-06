import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4MzUwMDAwLCJqdGkiOiI1N2ZiNjM4Y2Q5MjA0MmIzODBlYmE1MjA4OGQ5Y2RlNyIsInVzZXJfaWQiOiJlZTBkODdiNi0wM2E0LTQxZGEtODRmOC1lYzA2OGY5ZGY5ZTEifQ.bnDVzKgmp9uNQnG7ubBi2AVWNBkf8IYIdza12Am1fK0';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
