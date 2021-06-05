import axios from 'react-native-axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIyOTQxMzQxLCJqdGkiOiIwYjYwYjJkNGI1M2Y0ZmFiODY2ZjExOTM5Yzc3ZjgxZSIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.XD0H0FesQ16jEIqo-TpHQhe2pcwdF-s0yb8bgkXN0ZE',
  },
});
