import {
  FETCH_ALL_LABEL,
  CREATE_LABEL,
  UPDATE_LABEL,
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
    case UPDATE_LABEL: {
      const updatedLabel = action.payload;
      const newLabels = state.labels.map((label) => (
        label.id === updatedLabel.id ? updatedLabel : label
      ));
      return {
        ...state,
        labels: newLabels,
      };
    }
    default:
      return state;
  }
};

export default labelReducer;
