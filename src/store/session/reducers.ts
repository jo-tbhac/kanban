import {
  SIGN_IN,
  SIGN_OUT,
  SessionState,
  SessionActionTypes,
} from './types';

const initialState: SessionState = {
  isSignIn: false,
  email: '',
  name: '',
};

const sessionReducer = (state = initialState, action: SessionActionTypes) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignIn: true,
        email: action.payload.email,
        name: action.payload.name,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        email: '',
        name: '',
      };
    default:
      return state;
  }
};

export default sessionReducer;
