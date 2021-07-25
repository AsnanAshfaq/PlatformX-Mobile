import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3Mjk5NDU4LCJqdGkiOiJmMGY0YzY5YTI3MzE0OThlODNhYzQwMTA2N2UxNjM4MyIsInVzZXJfaWQiOiJjZDRkY2QwNS1iYzk3LTQ4MmYtOTEyOC02ZGM4NDBiYzA3YmYifQ.4aZ5IdrovHvDisMLQabpOBLKYAlXIpNJzE3dfV2Bf4k';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
