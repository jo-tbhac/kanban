import { LOAD_END, LoadingState, LoadingActionTypes } from './types';

const initialState: LoadingState = {
  isLoading: true,
};

const loadingReducer = (state = initialState, action: LoadingActionTypes) => {
  switch (action.type) {
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
