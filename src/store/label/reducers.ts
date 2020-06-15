import {
  FETCH_ALL_LABEL,
  CREATE_LABEL,
  LabelState,
  LabelActionTypes,
} from './types';

const initialState: LabelState = {
  labels: [],
};

const labelReducer = (state = initialState, action: LabelActionTypes) => {
  switch (action.type) {
    case FETCH_ALL_LABEL:
      return {
        ...state,
        labels: action.payload,
      };
    case CREATE_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    default:
      return state;
  }
};

export default labelReducer;
