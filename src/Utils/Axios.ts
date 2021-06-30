import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1MTU1ODEwLCJqdGkiOiI3YmNiYzZjM2MyOTI0Y2Y3YWVmMDBiNzEwMDVlZDg3NyIsInVzZXJfaWQiOiJkMzY0MjMxZC00MGJlLTQyN2EtODFiNC05OWMwYzZiYTAzZDcifQ.5JOgS3xKJCtTiwKgjR62Cr8ea1z8Yyx9h8Cfd7UJqZk',
  },
});
