import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import BoardForm from '../../components/BoardForm';

describe('<BoardForm />', () => {
  test('exists a newBoardCard and does not exist newBoardForm if state of `isFormVisible` is false', () => {
    const store = storeFactory();
    const { getByTestId, queryByTestId } = renderWithRouter(<BoardForm />, store);

    expect(getByTestId('newBoardCard')).toBeVisible();
    expect(queryByTestId('newBoardForm')).toBeNull();
  });

  test('exists a newBoardForm and does not exist newBoardCard if state of `isFormVisible` is true', () => {
    const store = storeFactory();
    const { getByTestId, queryByTestId } = renderWithRouter(<BoardForm />, store);

    fireEvent.click(getByTestId('newBoardCard'));
    expect(getByTestId('newBoardForm')).toBeVisible();
    expect(queryByTestId('newBoardCard')).toBeNull();
  });

  test('update state of `boardName` if boardName text field upon changed', () => {
    const store = storeFactory();
    const { getByTestId } = renderWithRouter(<BoardForm />, store);

    fireEvent.click(getByTestId('newBoardCard'));

    const boardNameTextField = getByTestId('boardNameTextField') as HTMLInputElement;
    const createBoardButton = getByTestId('createBoardButton') as HTMLButtonElement;

    expect(boardNameTextField.value).toBe('');

    const mockText = 'sample board';
    fireEvent.change(boardNameTextField, { target: { value: mockText } });
    expect(boardNameTextField.value).toBe(mockText);
    expect(createBoardButton.disabled).toBeFalsy();
  });

  test('disable a submit button if state of `boardName` is blank', () => {
    const store = storeFactory();
    const { getByTestId } = renderWithRouter(<BoardForm />, store);

    fireEvent.click(getByTestId('newBoardCard'));

    const createBoardButton = getByTestId('createBoardButton') as HTMLButtonElement;
    expect(createBoardButton.disabled).toBeTruthy();
  });
});
