//@ts-ignore
import {BASE_ADDRESS} from 'react-native-dotenv';
const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4Njg0NDQ1LCJqdGkiOiI3NjQzMmUzNTA2ZTI0MGFmODI2Njk2NmNhZDg5NTBhOSIsInVzZXJfaWQiOiJjZDRkY2QwNS1iYzk3LTQ4MmYtOTEyOC02ZGM4NDBiYzA3YmYifQ.f0WV6s4bFyAvVC8wv_MKpEg2FwYbY6TuhFYC3IRQ81I';

const get_web_socket = (query: string) => {
  return new WebSocket(`ws://${BASE_ADDRESS}/ws/${query}`, null, {
    headers: {
      authorization: `Bearer ${Token}`,
    },
  });
};

export default get_web_socket;
