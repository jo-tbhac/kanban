import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { Dialog } from '../../../components/common/Dialog';
import { dialogTypeSuccess, dialogTypeError, dialogTypeAsk } from '../../../store/dialog/types';

describe('Dialog component', () => {
  let closeDialog: jest.Mock;
  let store: Store;

  beforeEach(() => {
    closeDialog = jest.fn();
    store = storeFactory({ dialog: { isDialogVisible: true } });
  });

  test('exist a success icon if props of `type` is `dialogTypeSuccess`', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeSuccess}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(getByTestId('dialogIcon')).toHaveClass('fa-check-circle');
  });

  test('exist a error icon if props of `type` is `dialogTypeError`', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeError}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(getByTestId('dialogIcon')).toHaveClass('fa-exclamation-circle');
  });

  test('exist a question icon if props of `type` is `dialogTypeAsk`', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeAsk}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(getByTestId('dialogIcon')).toHaveClass('fa-question-circle');
  });

  test('exist a cancel button if props of `type` is `dialogTypeAsk`', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeAsk}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(getByTestId('dialogCancelButton')).toBeVisible();
  });

  test('does not exist a cancel button if props of `type` is `dialogTypeSuccess`', () => {
    const { queryByTestId } = render(
      <Dialog
        type={dialogTypeSuccess}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(queryByTestId('dialogCancelButton')).toBeNull();
  });

  test('does not exist a cancel button if props of `type` is `dialogTypeError`', () => {
    const { queryByTestId } = render(
      <Dialog
        type={dialogTypeError}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );
    expect(queryByTestId('dialogCancelButton')).toBeNull();
  });

  test('should call `closeDialog` when click a cancel button', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeAsk}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('dialogCancelButton'));
    expect(closeDialog).toHaveBeenCalled();
  });

  test('should call `closeDialog` if props of `onConfirm` is null when click a confirm button', () => {
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeSuccess}
        title=""
        description=""
        onConfirm={null}
        closeDialog={closeDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('dialogConfirmButton'));
    expect(closeDialog).toHaveBeenCalled();
  });

  test('should call `onConfirm` when click a confirm button', () => {
    const onConfirm = jest.fn();
    const { getByTestId } = render(
      <Dialog
        type={dialogTypeSuccess}
        title=""
        description=""
        onConfirm={onConfirm}
        closeDialog={closeDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('dialogConfirmButton'));
    expect(onConfirm).toHaveBeenCalled();
    expect(closeDialog).not.toHaveBeenCalled();
  });
});
