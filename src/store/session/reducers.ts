import {
  SIGN_IN,
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
    default:
      return state;
  }
};

export default sessionReducer;
