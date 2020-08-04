import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { DeleteBoardButton } from '../../../components/board/DeleteBoardButton';

describe('DeleteBoardButton component', () => {
  let store: Store;
  let openDialog: jest.Mock;
  let deleteBoard: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    openDialog = jest.fn();
    deleteBoard = jest.fn();
  });

  test('should call `openDialog` upon press a component', () => {
    const { getByRole } = renderWithRouter(
      <DeleteBoardButton boards={[]} openDialog={openDialog} deleteBoard={deleteBoard} />,
      store,
      ['/board/1'],
    );

    fireEvent.click(getByRole('button'));
    expect(openDialog).toHaveBeenCalled();
  });

  test('should not render a component if current location is not `/board/:boardId`', () => {
    const { queryByRole } = renderWithRouter(
      <DeleteBoardButton boards={[]} openDialog={openDialog} deleteBoard={deleteBoard} />,
      store,
      ['/'],
    );
    expect(queryByRole('button')).toBeNull();
  });
});
