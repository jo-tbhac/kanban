import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { ListForm } from '../../components/ListForm';

describe('<ListForm>', () => {
  let store: Store;
  let createList: jest.Mock;
  let setListFormVisible: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    createList = jest.fn();
    setListFormVisible = jest.fn();
  });

  test('update state of `listName` upon list name text field changed', () => {
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

    fireEvent.click(getByTestId('listFormCancelButton'));
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });

  test('disable a submit button if state of `listName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    const listFormSubmitButton = getByTestId('listFormSubmitButton') as HTMLButtonElement;
    expect(listFormSubmitButton.disabled).toBeTruthy();
  });

  test('disable a submit button if state of `listName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <ListForm setListFormVisible={setListFormVisible} createList={createList} />,
      store,
    );

    const listFormSubmitButton = getByTestId('listFormSubmitButton') as HTMLButtonElement;
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

    const listFormSubmitButton = getByTestId('listFormSubmitButton') as HTMLButtonElement;
    expect(listFormSubmitButton.disabled).toBeFalsy();
  });

  test('should call `createList` when click a submit button', () => {
    const boardID = 1;
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardID"
        render={() => (
          <ListForm setListFormVisible={setListFormVisible} createList={createList} />
        )}
      />,
      store,
      [`/board/${boardID}`],
    );
    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('listFormSubmitButton'));

    expect(createList).toHaveBeenCalledWith(boardID, { name: mockText });
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `createList` if url params is invalid when click a submit button', () => {
    const boardID = 'smfinchisdds';
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardID"
        render={() => (
          <ListForm setListFormVisible={setListFormVisible} createList={createList} />
        )}
      />,
      store,
      [`/board/${boardID}`],
    );
    const mockText = 'sample list';
    const listNameTextField = getByTestId('listNameTextField') as HTMLInputElement;
    fireEvent.change(listNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('listFormSubmitButton'));

    expect(createList).not.toHaveBeenCalled();
    expect(setListFormVisible).toHaveBeenCalledWith(false);
  });
});
