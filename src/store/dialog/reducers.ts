import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  DialogState,
  DialogActionTypes,
  dialogTypeSuccess,
} from './types';

const initialState: DialogState = {
  isDialogVisible: false,
  type: dialogTypeSuccess,
  title: '',
  description: '',
  onConfirm: null,
};

const dialogReducer = (state = initialState, action: DialogActionTypes): DialogState => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        isDialogVisible: true,
        type: action.payload.type,
        title: action.payload.title,
        description: action.payload.description || '',
        onConfirm: action.payload.onConfirm || null,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        isDialogVisible: false,
        type: dialogTypeSuccess,
        title: '',
        description: '',
        onConfirm: null,
      };
    default:
      return state;
  }
};

export default dialogReducer;
