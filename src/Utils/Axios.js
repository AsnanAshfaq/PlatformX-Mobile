import axios from 'react-native-axios';
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MTAzMDczLCJqdGkiOiI5YzA5NmUyNzAwYmE0YjllYjcwZWJkZTg5Y2U4ZTU5YyIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.IHzA3JgyluAcZW8cyTl04ahMzaRXeaTjFIqpJUIPktU',
  },
});
