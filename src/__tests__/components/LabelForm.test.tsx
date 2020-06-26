import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { LabelForm } from '../../components/LabelForm';

describe('<LabelForm>', () => {
  let store: Store;
  let setLabelFormVisible: jest.Mock;
  let createLabel: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    setLabelFormVisible = jest.fn();
    createLabel = jest.fn();
  });

  test('update state of `labelName` if name text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />,
      store,
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    expect(labelNameTextField.value).toBe('');

    const mockText = 'sample label';
    fireEvent.change(labelNameTextField, { target: { value: mockText } });
    expect(labelNameTextField.value).toBe(mockText);
  });

  test('should call `setLabelFormVisible` when clicked a cancel button', () => {
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />,
      store,
    );

    fireEvent.click(getByTestId('labelFormCancelButton'));
    expect(setLabelFormVisible).toHaveBeenCalledWith(false);
  });

  test('should show `ColorPicker` when clicked a color icon', () => {
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />,
      store,
    );

    fireEvent.click(getByTestId('labelFormColorIcon'));
    expect(getByTestId('colorPicker')).toBeVisible();
  });

  test('disable a submit button if state of `labelName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />,
      store,
    );

    const createLabelButton = getByTestId('labelFormSubmitButton') as HTMLButtonElement;
    expect(createLabelButton.disabled).toBeTruthy();
  });

  test('enable a submit button if state of `labelName` is not blank', () => {
    const { getByTestId } = renderWithRouter(
      <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />,
      store,
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    const mockText = 'sample label';

    fireEvent.change(labelNameTextField, { target: { value: mockText } });
    expect(labelNameTextField.value).toBe(mockText);

    const createLabelButton = getByTestId('labelFormSubmitButton') as HTMLButtonElement;
    expect(createLabelButton.disabled).toBeFalsy();
  });

  test('should call `createLabel` with params of `name` and `color` when click a submit button', () => {
    const boardId = 1;
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    const mockText = 'label';
    fireEvent.change(labelNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('labelFormSubmitButton'));

    expect(createLabel).toHaveBeenCalledWith(boardId, { name: mockText, color: '#e53935' });
  });

  test('should not call `createLabel` if url params is invalid when click a submit button', () => {
    const boardId = 'indfsdjes';
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <LabelForm setLabelFormVisible={setLabelFormVisible} createLabel={createLabel} />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    const labelNameTextField = getByTestId('labelNameTextField') as HTMLInputElement;
    const mockText = 'label';
    fireEvent.change(labelNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('labelFormSubmitButton'));

    expect(createLabel).not.toHaveBeenCalled();
  });
});
