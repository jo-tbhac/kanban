import {
  READY,
  LOAD_END,
  LoadingState,
  LoadingActionTypes,
} from './types';

const initialState: LoadingState = {
  ready: false,
  isLoading: true,
};

const loadingReducer = (state = initialState, action: LoadingActionTypes) => {
  switch (action.type) {
    case READY:
      return {
        ...state,
        ready: true,
      };
    case LOAD_END:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
