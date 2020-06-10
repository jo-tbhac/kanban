import { openDialog, closeDialog } from '../../../store/dialog/actions';
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  dialogTypeSuccess,
  DialogTypes,
} from '../../../store/dialog/types';

describe('dialog actions', () => {
  test('returns an action with type `OPEN_DIALOG` and payload', () => {
    const mockFunc = jest.fn();
    const dialogProps = {
      type: dialogTypeSuccess as DialogTypes,
      title: 'test',
      description: 'description',
      onConfirm: mockFunc,
    };

    const action = openDialog(dialogProps);
    expect(action).toEqual({ type: OPEN_DIALOG, payload: dialogProps });
  });

  test('returns an action with type `CLOSE_DIALOG`', () => {
    const action = closeDialog();
    expect(action).toEqual({ type: CLOSE_DIALOG });
  });
});
