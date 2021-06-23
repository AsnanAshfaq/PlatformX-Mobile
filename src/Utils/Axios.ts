import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0NTM1Nzg2LCJqdGkiOiJkZDVkMDhjMDMzNTE0YTJlYjM2ODZmNjJiMTk2NjVmYiIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.gxuNdSq1twtlOXO-amzGf3Rt1sjFUkSO0JLiz4HEClQ',
  },
});
