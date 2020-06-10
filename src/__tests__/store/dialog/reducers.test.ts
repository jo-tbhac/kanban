import dialogReducer from '../../../store/dialog/reducers';
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  DialogState,
  DialogTypes,
  dialogTypeSuccess,
} from '../../../store/dialog/types';

describe('dialog reducer', () => {
  let initialState: DialogState;
  beforeEach(() => {
    initialState = {
      isDialogVisible: false,
      type: dialogTypeSuccess,
      title: '',
      description: '',
      onConfirm: null,
    };
  });

  test('returns state upon recieving an action type `OPEN_DIALOG`', () => {
    const mockFunc = jest.fn();
    const dialogProps = {
      type: dialogTypeSuccess as DialogTypes,
      title: 'test',
      description: 'description',
      onConfirm: mockFunc,
    };

    const newState = dialogReducer(undefined, { type: OPEN_DIALOG, payload: dialogProps });
    expect(newState.isDialogVisible).toBeTruthy();
    expect(newState.type).toBe(dialogProps.type);
    expect(newState.title).toBe(dialogProps.title);
    expect(newState.description).toBe(dialogProps.description);
    expect(newState.onConfirm).toBe(dialogProps.onConfirm);
  });

  test('returns state upon recieving an action type `CLOSE_DIALOG`', () => {
    const previousState = { ...initialState, isDialogVisible: true };
    const newState = dialogReducer(previousState, { type: CLOSE_DIALOG });

    expect(newState.isDialogVisible).toBeFalsy();
    expect(newState.type).toBe(initialState.type);
    expect(newState.title).toBe(initialState.title);
    expect(newState.description).toBe(initialState.description);
    expect(newState.onConfirm).toBe(initialState.onConfirm);
  });
});
