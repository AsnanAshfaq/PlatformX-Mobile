import axios from 'react-native-axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMDMwMTQ0LCJqdGkiOiJiZmNlNjQxMDBhNWU0ODAwYTMzYzM0MDRjYmU0MDNjYSIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.T7pcM_Svw5Y2vesfZeG2EXCjTljvWI6vvsokt46eFvw',
  },
});
