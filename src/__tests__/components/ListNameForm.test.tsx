import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { ListNameForm } from '../../components/ListNameForm';

describe('<ListNameForm>', () => {
  const listID = 1;
  const initialListName = 'initial list';
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('update state of `listName` upon list name text field changed', () => {
    const setListFormVisible = jest.fn();
    const updateList = jest.fn();
    const { getByTestId } = render(
      <ListNameForm
        listID={listID}
        initialListName={initialListName}
        setListFormVisible={setListFormVisible}
        updateList={updateList}
      />,
      store,
    );

    const mockText = 'updated list';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    expect(listNameForm.value).toBe(mockText);
  });

  test('should not call `updateList` if a text field is blank when focus out from `listNameForm`', () => {
    const setListFormVisible = jest.fn();
    const updateList = jest.fn();
    const { getByTestId } = render(
      <ListNameForm
        listID={listID}
        initialListName={initialListName}
        setListFormVisible={setListFormVisible}
        updateList={updateList}
      />,
      store,
    );

    const mockText = '';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(setListFormVisible).toBeCalledWith(false);
    expect(updateList).not.toBeCalled();
  });

  test('should not call `updateList` if state of `listName` to equal `initialListName` when focus out from `listNameForm`', () => {
    const setListFormVisible = jest.fn();
    const updateList = jest.fn();
    const { getByTestId } = render(
      <ListNameForm
        listID={listID}
        initialListName={initialListName}
        setListFormVisible={setListFormVisible}
        updateList={updateList}
      />,
      store,
    );

    const mockText = initialListName;
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(setListFormVisible).toBeCalledWith(false);
    expect(updateList).not.toBeCalled();
  });

  test('should call `updateList` if state of `listName` has changed when focus out from `listNameForm`', () => {
    const setListFormVisible = jest.fn();
    const updateList = jest.fn();
    const { getByTestId } = render(
      <ListNameForm
        listID={listID}
        initialListName={initialListName}
        setListFormVisible={setListFormVisible}
        updateList={updateList}
      />,
      store,
    );

    const mockText = 'updated list';
    const listNameForm = getByTestId('listNameForm') as HTMLInputElement;
    fireEvent.change(listNameForm, { target: { value: mockText } });

    fireEvent.blur(getByTestId('listNameForm'));
    expect(setListFormVisible).toBeCalledWith(false);
    expect(updateList).toBeCalled();
  });
});
