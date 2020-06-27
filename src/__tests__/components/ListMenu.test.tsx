import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { ListMenu } from '../../components/ListMenu';

describe('ListMenu component', () => {
  let store: Store;
  let setListMenuVisible: jest.Mock;
  let openDialog: jest.Mock;
  let deleteList: jest.Mock;
  const listId = 1;

  beforeEach(() => {
    store = storeFactory();
    setListMenuVisible = jest.fn();
    openDialog = jest.fn();
    deleteList = jest.fn();
  });

  test('should call `setListMenuVisible` when click a close button', () => {
    const { getByTestId } = render(
      <ListMenu
        setListMenuVisible={setListMenuVisible}
        openDialog={openDialog}
        deleteList={deleteList}
        listId={listId}
      />,
      store,
    );

    fireEvent.click(getByTestId('listMenuCloseButton'));
    expect(setListMenuVisible).toHaveBeenCalledWith(false);
  });

  test('should call `openDialog` when click a delete list button', () => {
    const { getByTestId } = render(
      <ListMenu
        setListMenuVisible={setListMenuVisible}
        openDialog={openDialog}
        deleteList={deleteList}
        listId={listId}
      />,
      store,
    );

    fireEvent.click(getByTestId('listMenuRowDelete'));
    expect(openDialog).toHaveBeenCalled();
  });
});
