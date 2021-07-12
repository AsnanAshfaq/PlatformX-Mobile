import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTc4NDYyLCJqdGkiOiIzMmEzODkzOTBkOGQ0MGEwYTBhNDhmZjY0YzAyYjUzNSIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.UfYHVmdGA5u31k_-qFC2W6enxrGRi-iFXEBJ32Ac_b0',
  },
});
