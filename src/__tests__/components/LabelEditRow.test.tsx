import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockLabel } from '../../utils/mockData';
import LabelEditRow from '../../components/LabelEditRow';

describe('<LabelEditRow>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should hide a label name form when state of `isEditFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow label={mockLabel} />,
      store,
    );

    expect(queryByTestId('labelEditTextField')).toBeNull();
    expect(getByTestId('labelEditName')).toBeVisible();
  });

  test('should show a label name form when state of `isEditFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEditRow label={mockLabel} />,
      store,
    );

    fireEvent.click(getByTestId('labelEditName'));
    expect(queryByTestId('labelEditName')).toBeNull();
    expect(getByTestId('labelEditTextField')).toBeVisible();
  });

  test('update state of `labelNameFormValue` if name text field upon changed', () => {
    const mockText = 'update label';
    const { getByTestId } = renderWithRouter(<LabelEditRow label={mockLabel} />, store);

    fireEvent.click(getByTestId('labelEditName'));

    const labelEditTextField = getByTestId('labelEditTextField') as HTMLInputElement;
    fireEvent.change(labelEditTextField, { target: { value: mockText } });
    expect(labelEditTextField.value).toBe(mockText);
  });

  test('should hide `ColorPicker` when state of `isColorPickerVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(<LabelEditRow label={mockLabel} />, store);
    expect(queryByTestId('colorPicker')).toBeNull();
  });

  test('should show `ColorPicker` when state of `isColorPickerVisible` is true', () => {
    const { getByTestId } = renderWithRouter(<LabelEditRow label={mockLabel} />, store);

    fireEvent.click(getByTestId('labelEditRowIcon'));
    expect(getByTestId('colorPicker')).toBeVisible();
  });
});
