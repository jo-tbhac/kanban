import React from 'react';

import { storeFactory, render } from '../../testUtils';
import Dialog from '../../components/Dialog';
import {
  dialogTypeSuccess,
  dialogTypeError,
  dialogTypeAsk,
  DialogState,
} from '../../store/dialog/types';

describe('<Dialog />', () => {
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

  test('exist a success icon if update state `dialog: type` to `dialogTypeSuccess`', () => {
    const store = storeFactory(
      { dialog: { ...initialState, isDialogVisible: true, type: dialogTypeSuccess } },
    );
    const { getByTestId } = render(<Dialog />, store);
    expect(getByTestId('dialogIcon')).toHaveClass('fa-check-circle');
  });

  test('exist a error icon if update state `dialog: type` to `dialogTypeError`', () => {
    const store = storeFactory(
      { dialog: { ...initialState, isDialogVisible: true, type: dialogTypeError } },
    );
    const { getByTestId } = render(<Dialog />, store);
    expect(getByTestId('dialogIcon')).toHaveClass('fa-exclamation-circle');
  });

  test('exist a question icon if update state `dialog: type` to `dialogTypeAsk`', () => {
    const store = storeFactory(
      { dialog: { ...initialState, isDialogVisible: true, type: dialogTypeAsk } },
    );
    const { getByTestId } = render(<Dialog />, store);
    expect(getByTestId('dialogIcon')).toHaveClass('fa-question-circle');
  });

  test('exist a cancel button if update state `dialog: type` to `dialogTypeAsk`', () => {
    const store = storeFactory(
      { dialog: { ...initialState, isDialogVisible: true, type: dialogTypeAsk } },
    );
    const { getByTestId } = render(<Dialog />, store);
    expect(getByTestId('dialogCancelButton')).toBeVisible();
  });
});
