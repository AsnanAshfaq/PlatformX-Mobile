import {darkColors, lightColors} from '../Constants/Colors';
export const initialState = {
  theme: darkColors,
  isLightTheme: false,
  userType: '',
  user: {},
  isSignedIn: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isLightTheme: !state.isLightTheme,
        theme: state.isLightTheme ? darkColors : lightColors,
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
