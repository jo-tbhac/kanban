import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { ListForm } from '../../components/list/ListForm';

describe('ListForm component', () => {
  let store: Store;
  let createList: jest.Mock;
  let setListFormVisible: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    createList = jest.fn();
    setListFormVisible = jest.fn();
  });

  test('update state of `listName` when a list name text field changed', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    expect(listNameTextField.value).toBe(mockText);
  });

  test('should call `setListFormVisible` upon clicked a cancel button', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    fireEvent.click(getByTestId('buttonCancel'));
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });

  test('disable a submit button if state of `listName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    const listFormSubmitButton = getByTestId('buttonSubmit') as HTMLButtonElement;
    expect(listFormSubmitButton.disabled).toBeTruthy();
  });

  test('disable a submit button if state of `listName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    const listFormSubmitButton = getByTestId('buttonSubmit') as HTMLButtonElement;
    expect(listFormSubmitButton.disabled).toBeTruthy();
  });

  test('enable a submit button if state of `listName` is not blank', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );
    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });

    const listFormSubmitButton = getByTestId('buttonSubmit') as HTMLButtonElement;
    expect(listFormSubmitButton.disabled).toBeFalsy();
  });

  test('should call `createList` when click a submit button', () => {
    const boardId = 1;
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <ListForm setListFormVisible={setListFormVisible} createList={createList} />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );
    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createList).toHaveBeenCalledWith(boardId, { name: mockText });
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `createList` if url params is invalid when click a submit button', () => {
    const boardId = 'smfinchisdds';
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <ListForm setListFormVisible={setListFormVisible} createList={createList} />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );
    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createList).not.toHaveBeenCalled();
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });
});
