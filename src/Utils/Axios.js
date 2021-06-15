import axios from 'react-native-axios';
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzODcyMDE2LCJqdGkiOiI2ZmQ0NmQ1NDY3Yjk0NGQxOWNmMGNmZDkxYTVjODgxZCIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ._FaG9SF3JPBnkNSXz-Nc5zitRv5j1N4v1W88wBMo-A8',
  },
});
