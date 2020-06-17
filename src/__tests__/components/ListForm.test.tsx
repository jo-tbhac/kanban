import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import ListForm from '../../components/ListForm';

describe('<ListForm>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('update state of `listName` upon list name text field changed', () => {
    const setListFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} />,
      store,
    );

    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    expect(listNameTextField.value).toBe(mockText);
  });

  test('should call `setListFormVisible` upon clicked a cancel button', () => {
    const setListFormVisible = jest.fn();
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} />,
      store,
    );

    fireEvent.click(getByTestId('listFormCancelButton'));
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });
});
