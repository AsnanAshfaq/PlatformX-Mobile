import axios from 'react-native-axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2NTM2NzYzLCJqdGkiOiI1ZmZmZTgzNjlhZjI0YmZkYjJlYmMxMDk5MDY2NjlkNSIsInVzZXJfaWQiOiI1NmU1M2M1MS0xOTBmLTRhYTktYjljZS03NzdmOTNkYTRkMDcifQ.2o56OUiT_gA_lmzpPWw22NJkLuEW3D50Rly0JOYe_i4';
export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});
