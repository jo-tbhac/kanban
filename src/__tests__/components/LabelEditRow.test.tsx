import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockLabel } from '../../utils/mockData';
import { LabelEditRow } from '../../components/LabelEditRow';

describe('<LabelEditRow>', () => {
  let store: Store;
  let updateLabel: jest.Mock;
  let deleteLabel: jest.Mock;
  let openDialog: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    updateLabel = jest.fn();
    deleteLabel = jest.fn();
    openDialog = jest.fn();
  });

  test('should hide a label name form when state of `isEditFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    expect(queryByTestId('labelEditTextField')).toBeNull();
    expect(getByTestId('labelEditName')).toBeVisible();
  });

  test('should show a label name form when state of `isEditFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));
    expect(queryByTestId('labelEditName')).toBeNull();
    expect(getByTestId('labelEditTextField')).toBeVisible();
  });

  test('update state of `labelNameFormValue` if name text field upon changed', () => {
    const mockText = 'update label';
    const { getByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));

    const labelEditTextField = getByTestId('labelEditTextField') as HTMLInputElement;
    fireEvent.change(labelEditTextField, { target: { value: mockText } });
    expect(labelEditTextField.value).toBe(mockText);
  });

  test('should hide `ColorPicker` when state of `isColorPickerVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );
    expect(queryByTestId('colorPicker')).toBeNull();
  });

  test('should show `ColorPicker` when state of `isColorPickerVisible` is true', () => {
    const { getByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditRowIcon'));
    expect(getByTestId('colorPicker')).toBeVisible();
  });

  test('should call `openConfirm` when click a delete button', () => {
    const { getByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditDeleteButton'));
    expect(openDialog).toHaveBeenCalled();
  });

  test('should call `updateLabel` when focus out from a label edit text field', () => {
    const { getByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));

    const mockText = 'update label';
    const labelEditTextField = getByTestId('labelEditTextField') as HTMLInputElement;
    fireEvent.change(labelEditTextField, { target: { value: mockText } });
    fireEvent.blur(labelEditTextField);

    const params = { name: mockText, color: mockLabel.color };
    expect(updateLabel).toHaveBeenCalledWith(mockLabel.id, params);
  });

  test('should not call `updateLabel` if state of `labelNameFormValue` is blank when focus out from a label edit text field', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));

    const mockText = '';
    const labelEditTextField = getByTestId('labelEditTextField') as HTMLInputElement;
    fireEvent.change(labelEditTextField, { target: { value: mockText } });
    fireEvent.blur(labelEditTextField);

    expect(updateLabel).not.toHaveBeenCalled();
    expect(queryByTestId('labelEditTextField')).toBeNull();
  });

  test('should not call `updateLabel` if state of `labelNameFormValue` to equal default value when focus out from a label edit text field', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));

    const mockText = mockLabel.name;
    const labelEditTextField = getByTestId('labelEditTextField') as HTMLInputElement;
    fireEvent.change(labelEditTextField, { target: { value: mockText } });
    fireEvent.blur(labelEditTextField);

    expect(updateLabel).not.toHaveBeenCalled();
    expect(queryByTestId('labelEditTextField')).toBeNull();
  });

  test('should call `updateLabel` when state of `selectedColor` was changed', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow
        label={mockLabel}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelEditRowIcon'));
    fireEvent.click(getByTestId('colorPickerIcon-0'));

    expect(updateLabel).toHaveBeenCalled();
    expect(queryByTestId('colorPicker')).toBeNull();
  });
});
