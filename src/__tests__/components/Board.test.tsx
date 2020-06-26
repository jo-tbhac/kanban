import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockBoard } from '../../utils/mockData';
import { Board } from '../../components/Board';

describe('<Board>', () => {
  let fetchBoard: jest.Mock;
  let store: Store;
  beforeEach(() => {
    fetchBoard = jest.fn();
    store = storeFactory();
  });

  test('should show `ListForm` when state of `isListsFormVisible` is true', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <Board selectedBoard={mockBoard} fetchBoard={fetchBoard} />,
      store,
    );
    fireEvent.click(getByTestId('addListButton'));

    expect(getByTestId('listForm')).toBeVisible();
    expect(queryByTestId('addListButton')).toBeNull();
  });

  test('should hide `ListForm` when state of `isListFormVisible` is false', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <Board selectedBoard={mockBoard} fetchBoard={fetchBoard} />,
      store,
    );

    expect(getByTestId('addListButton')).toBeVisible();
    expect(queryByTestId('listForm')).toBeNull();
  });

  test('should call `fetchBoard` when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board selectedBoard={mockBoard} fetchBoard={fetchBoard} />
      </Route>,
      store,
      ['/board/1'],
    );
    expect(fetchBoard).toHaveBeenCalled();
  });

  test('should not call `fetchBoard` if url params `boardId` is not a number when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board selectedBoard={mockBoard} fetchBoard={fetchBoard} />
      </Route>,
      store,
      ['/board/test'],
    );
    expect(fetchBoard).not.toHaveBeenCalled();
  });
});
