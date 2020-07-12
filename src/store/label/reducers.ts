import {
  FETCH_ALL_LABEL,
  CREATE_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  CHECK_LABEL,
  UNCHECK_LABEL,
  LabelState,
  LabelActionTypes,
} from './types';

const initialState: LabelState = {
  labels: [],
  selectedLabelIds: [],
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
    case DELETE_LABEL:
      return {
        ...state,
        labels: state.labels.filter((label) => label.id !== action.payload),
      };
    case CHECK_LABEL:
      return {
        ...state,
        selectedLabelIds: [...state.selectedLabelIds, action.payload],
      };
    case UNCHECK_LABEL:
      return {
        ...state,
        selectedLabelIds: state.selectedLabelIds.filter((labelId) => labelId !== action.payload),
      };
    default:
      return state;
  }
};

export default labelReducer;
