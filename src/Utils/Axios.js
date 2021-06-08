import axios from 'react-native-axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMjE5NjIwLCJqdGkiOiI3NTQ4YzE3ZTE0MTg0NzNjODdhMDY5ODUwMjQ0Y2M2OCIsInVzZXJfaWQiOiIyNTMxMGM4OS00Y2I1LTQ1NTEtOGY5My1jN2UxZDhhMGFiOGYifQ.SfbYNzvr3GErRlHVFel_6ZostPOQKT2wUVNoVVdE_f4',
  },
});
