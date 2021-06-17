import axios from 'react-native-axios';
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MDI5NDEzLCJqdGkiOiJjOTBjZjU2NWI0OWI0ZGRlYWZjYmJiOTcwYzg5ZTA0MiIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.Y6KoBpKUvNSAFdSXcMow3uUzw0ZgkbW3cwkguhbX2y8',
  },
});
