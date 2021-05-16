import {darkColors, lightColors} from '../Constants/Colors';
export const initialState = {
  theme: lightColors,
  isLightTheme: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isLightTheme: !state.isLightTheme,
        theme: state.isLightTheme ? darkColors : lightColors,
      };
  }
};
