import {darkColors, lightColors} from '../Constants/Colors';
export const initialState = {
  theme: darkColors,
  themeName: 'dark',
  userType: '',
  user: {},
  isSignedIn: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        themeName: action.payload,
        theme:
          action.payload === 'light'
            ? lightColors
            : action.payload === 'dark' && darkColors,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_SIGN_IN':
      return {
        ...state,
        isSignedIn: action.payload,
      };

    case 'SET_SIGN_OUT':
      return {
        ...initialState,
      };

    case 'SET_USER_TYPE':
      return {
        ...state,
        userType: action.payload,
      };
  }
};
