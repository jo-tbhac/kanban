import {
  SIGN_IN,
  SIGN_OUT,
  SessionState,
  SessionActionTypes,
} from './types';

const initialState: SessionState = {
  isSignIn: false,
};

const sessionReducer = (state = initialState, action: SessionActionTypes) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
      };
    default:
      return state;
  }
};

export default sessionReducer;
