import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, storeFactory } from '../../../testUtils';
import { BoardIndex } from '../../../components/board/BoardIndex';
import { mockBoards } from '../../../utils/mockData';
import { Store } from '../../../store';

describe('BoardIndex component', () => {
  let store: Store;
  let fetchAllBoards: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    fetchAllBoards = jest.fn();
  });

  test('should call `fetchAllBoards` when component did mount', () => {
    render(
      <MemoryRouter>
        <BoardIndex boards={mockBoards} fetchAllBoards={fetchAllBoards} />
      </MemoryRouter>,
      store,
    );

    expect(fetchAllBoards).toHaveBeenCalled();
  });
});
