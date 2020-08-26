import { FETCH_TESTERS, TesterActionTypes, TesterState } from './types';

const initialState: TesterState = {
  testers: [],
};

const testerReducer = (state = initialState, action: TesterActionTypes) => {
  switch (action.type) {
    case FETCH_TESTERS:
      return {
        ...state,
        testers: action.payload,
      };
    default:
      return state;
  }
};

export default testerReducer;
