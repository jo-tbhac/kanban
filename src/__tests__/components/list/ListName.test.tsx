import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { ListName } from '../../../components/list/ListName';

describe('ListName component', () => {
  const listId = 1;
  const initialListName = 'initial list';
  let store: Store;
  let updateList: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    updateList = jest.fn();
  });

  test('should show `ListNameForm` when state of `isListFormVisible` is true', () => {
    const { queryByTestId, getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );
    fireEvent.click(getByTestId('listName'));

    expect(queryByTestId('listName')).toBeNull();
    expect(getByTestId('listNameForm')).toBeVisible();
  });

  test('should hide `ListNameForm` when state of `isListFormVisible` is false', () => {
    const { queryByTestId, getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );

    expect(queryByTestId('listNameForm')).toBeNull();
    expect(getByTestId('listName')).toBeVisible();
  });

  test('update state of `listName` upon list name text field changed', () => {
    const { getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );

    fireEvent.click(getByTestId('listName'));

    const mockText = 'updated list';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    expect(listNameForm.value).toBe(mockText);
  });

  test('should not call `updateList` if a text field is blank when focus out from `listNameForm`', () => {
    const { getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );

    fireEvent.click(getByTestId('listName'));

    const mockText = '';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(updateList).not.toBeCalled();
  });

  test('should not call `updateList` if state of `listName` to equal `initialListName` when focus out from `listNameForm`', () => {
    const { getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );

    fireEvent.click(getByTestId('listName'));

    const mockText = initialListName;
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(updateList).not.toBeCalled();
  });

  test('should call `updateList` if state of `listName` has changed when focus out from `listNameForm`', () => {
    const { getByTestId } = render(
      <ListName
        listId={listId}
        initialListName={initialListName}
        updateList={updateList}
      />,
      store,
    );

    fireEvent.click(getByTestId('listName'));

    const mockText = 'updated list';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(updateList).toBeCalled();
  });
});
