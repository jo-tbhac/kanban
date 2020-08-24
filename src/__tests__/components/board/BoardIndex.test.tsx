import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, storeFactory } from '../../../testUtils';
import { BoardIndex } from '../../../components/board/BoardIndex';
import { mockBoards } from '../../../utils/mockData';
import { Store } from '../../../store';

describe('BoardIndex component', () => {
  let store: Store;
  let fetchAllBoards: jest.Mock;
  let initRedirectToBoardIndex: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    fetchAllBoards = jest.fn();
    initRedirectToBoardIndex = jest.fn();
  });

  test('should call `fetchAllBoards` when component did mount', () => {
    render(
      <MemoryRouter>
        <BoardIndex
          boards={mockBoards}
          fetchAllBoards={fetchAllBoards}
          initRedirectToBoardIndex={initRedirectToBoardIndex}
        />
      </MemoryRouter>,
      store,
    );

    expect(fetchAllBoards).toHaveBeenCalled();
  });

  test('should call `initRedirectToBoardIndex` when component did mount', () => {
    render(
      <MemoryRouter>
        <BoardIndex
          boards={mockBoards}
          fetchAllBoards={fetchAllBoards}
          initRedirectToBoardIndex={initRedirectToBoardIndex}
        />
      </MemoryRouter>,
      store,
    );

    expect(initRedirectToBoardIndex).toHaveBeenCalled();
  });
});
