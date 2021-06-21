import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MzU5NTQ1LCJqdGkiOiJmZGZlZDIzMWYzN2I0ZTExYWJkYzk4YTcxNDkzMThmZSIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.WGx-cobV0V54YJxeaeeX0RtvjW8fxYFkNYJTABZajTY',
  },
});
