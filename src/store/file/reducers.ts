import {
  FETCH_FILES,
  UPLOAD_FILE,
  FileActoinTypes,
  FileState,
} from './types';

const initialState: FileState = {
  files: [],
};

const fileReducer = (state = initialState, action: FileActoinTypes) => {
  switch (action.type) {
    case FETCH_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    default:
      return state;
  }
};

export default fileReducer;
