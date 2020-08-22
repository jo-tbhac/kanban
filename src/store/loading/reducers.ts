import {
  READY,
  LOAD_START,
  LOAD_END,
  LoadingState,
  LoadingActionTypes,
} from './types';

const initialState: LoadingState = {
  ready: false,
  isLoading: false,
};

const loadingReducer = (state = initialState, action: LoadingActionTypes) => {
  switch (action.type) {
    case READY:
      return {
        ...state,
        ready: true,
      };
    case LOAD_START:
      return {
        ...state,
        isLoading: true,
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
