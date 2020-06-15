import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import LabelForm from '../../components/LabelForm';

describe('<LabelForm>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('update state of `labelName` if name text field upon changed', () => {
    const setLabelFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} />,
      store,
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    expect(labelNameTextField.value).toBe('');

    const mockText = 'sample label';
    fireEvent.change(labelNameTextField, { target: { value: mockText } });
    expect(labelNameTextField.value).toBe(mockText);
  });

  test('should call `setLabelFormVisible` when clicked a cancel button', () => {
    const setLabelFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} />,
      store,
    );

    fireEvent.click(getByTestId('labelFormCancelButton'));
    expect(setLabelFormVisible).toHaveBeenCalledWith(false);
  });

  test('should show `ColorPicker` when clicked a color icon', () => {
    const setLabelFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} />,
      store,
    );

    fireEvent.click(getByTestId('labelFormColorIcon'));
    expect(getByTestId('colorPicker')).toBeVisible();
  });

  test('disable a submit button if state of `labelName` is blank', () => {
    const setLabelFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} />,
      store,
    );

    const createLabelButton = getByTestId('labelFormSubmitButton') as HTMLButtonElement;
    expect(createLabelButton.disabled).toBeTruthy();
  });

  test('enable a submit button if state of `labelName` is not blank', () => {
    const setLabelFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} />,
      store,
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    const mockText = 'sample label';

    fireEvent.change(labelNameTextField, { target: { value: 'sample label' } });
    expect(labelNameTextField.value).toBe(mockText);

    const createLabelButton = getByTestId('labelFormSubmitButton') as HTMLButtonElement;
    expect(createLabelButton.disabled).toBeFalsy();
  });
});
