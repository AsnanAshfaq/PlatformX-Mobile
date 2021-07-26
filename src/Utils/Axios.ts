import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3Mzg2NDA0LCJqdGkiOiJjMmZmYTlkMzNhMTM0M2E0YTk3YWMyNGI0ZmI1YjFkNSIsInVzZXJfaWQiOiJjZDRkY2QwNS1iYzk3LTQ4MmYtOTEyOC02ZGM4NDBiYzA3YmYifQ.NM64iPGOdNzyd_7V_JdChUQf4V5JxBGWMdsNWCl4v1U';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
