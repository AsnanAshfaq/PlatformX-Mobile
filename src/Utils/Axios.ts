import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0OTY4Mjc0LCJqdGkiOiJlZDRlMTAzNTRjYmY0MjlhOGNkMjFmY2M3YzQwM2MzYyIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.eG9mN_k0oZB-wYjGEm-4ng1hXxucMDVTfzomTHAU2U4',
  },
});
