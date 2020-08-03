import React from 'react';
import { Route } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { mockBoard } from '../../../utils/mockData';
import { Board } from '../../../components/board/Board';

describe('Board component', () => {
  let mock: MockAdapter;
  let fetchBoard: jest.Mock;
  let fetchCheckLists: jest.Mock;
  let fetchFiles: jest.Mock;
  let store: Store;

  beforeEach(() => {
    fetchBoard = jest.fn();
    fetchCheckLists = jest.fn();
    fetchFiles = jest.fn();
    store = storeFactory();

    mock = new MockAdapter(axios);
    mock.onGet('/board/1/labels').reply(200, { labels: [] });
  });

  test('should show `ListForm` when state of `isListsFormVisible` is true', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <Board
        selectedBoard={mockBoard}
        fetchBoard={fetchBoard}
        fetchCheckLists={fetchCheckLists}
        fetchFiles={fetchFiles}
      />,
      store,
    );
    fireEvent.click(getByTestId('addListButton'));

    expect(getByTestId('listForm')).toBeVisible();
    expect(queryByTestId('addListButton')).toBeNull();
  });

  test('should hide `ListForm` when state of `isListFormVisible` is false', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <Board
        selectedBoard={mockBoard}
        fetchBoard={fetchBoard}
        fetchCheckLists={fetchCheckLists}
        fetchFiles={fetchFiles}
      />,
      store,
    );

    expect(getByTestId('addListButton')).toBeVisible();
    expect(queryByTestId('listForm')).toBeNull();
  });

  test('should call `fetchBoard` when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board
          selectedBoard={mockBoard}
          fetchBoard={fetchBoard}
          fetchCheckLists={fetchCheckLists}
          fetchFiles={fetchFiles}
        />
      </Route>,
      store,
      ['/board/1'],
    );
    expect(fetchBoard).toHaveBeenCalled();
  });

  test('should call `fetchCheckLists` when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board
          selectedBoard={mockBoard}
          fetchBoard={fetchBoard}
          fetchCheckLists={fetchCheckLists}
          fetchFiles={fetchFiles}
        />
      </Route>,
      store,
      ['/board/1'],
    );
    expect(fetchCheckLists).toHaveBeenCalled();
  });

  test('should not call `fetchBoard` if url params `boardId` is not a number when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board
          selectedBoard={mockBoard}
          fetchBoard={fetchBoard}
          fetchCheckLists={fetchCheckLists}
          fetchFiles={fetchFiles}
        />
      </Route>,
      store,
      ['/board/test'],
    );
    expect(fetchBoard).not.toHaveBeenCalled();
  });

  test('should not call `fetchCheckLists` if url params `boardId` is not a number when component did mount', () => {
    renderWithRouter(
      <Route path="/board/:boardId">
        <Board
          selectedBoard={mockBoard}
          fetchBoard={fetchBoard}
          fetchCheckLists={fetchCheckLists}
          fetchFiles={fetchFiles}
        />
      </Route>,
      store,
      ['/board/test'],
    );
    expect(fetchCheckLists).not.toHaveBeenCalled();
  });
});
