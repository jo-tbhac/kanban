import React from 'react';

import { storeFactory, render, fireEvent } from '../../testUtils';
import { Store } from '../../store';
import { Dialog } from '../../components/Dialog';
import { dialogTypeSuccess, dialogTypeError, dialogTypeAsk } from '../../store/dialog/types';

describe('<Dialog />', () => {
  let closeDialog: jest.Mock;
  let store: Store;

  beforeEach(() => {
    closeDialog = jest.fn();
    store = storeFactory({ dialog: { isDialogVisible: true } });
  });

  test('exist a success icon if update state `dialog: type` to `dialogTypeSuccess`', () => {
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

  test('exist a error icon if update state `dialog: type` to `dialogTypeError`', () => {
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

  test('exist a question icon if update state `dialog: type` to `dialogTypeAsk`', () => {
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

  test('exist a cancel button if update state `dialog: type` to `dialogTypeAsk`', () => {
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

  test('does not exist a cancel button if update state `dialog: type` to `dialogTypeSuccess`', () => {
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

  test('does not exist a cancel button if update state `dialog: type` to `dialogTypeError`', () => {
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
