import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0NzA4MTk5LCJqdGkiOiJhMDU0MThjMzdhMDI0MzIwOWVkODdkN2NlZjM4OTExZSIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.tQUPRt12Rsu-G3tA3Jq8-YxDou0GUlQ3Q8-iNLcTvnk',
  },
});
