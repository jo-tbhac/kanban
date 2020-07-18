import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { BoardIndex } from '../../components/board/BoardIndex';
import { mockBoards } from '../../utils/mockData';
import { Store } from '../../store';

describe('BoardIndex component', () => {
  let store: Store;
  let fetchAllBoards: jest.Mock;
  let mockLocation: {pathname: string};
  const renderWithRouter = (component: ReactElement) => (
    render(
      <MemoryRouter>
        {component}
        <Route
          path="*"
          render={({ location }) => {
            mockLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      store,
    )
  );

  beforeEach(() => {
    store = storeFactory();
    fetchAllBoards = jest.fn();
  });

  test('navigate to `/board/:boardId` when click a board index card', () => {
    const { getAllByTestId } = renderWithRouter(
      <BoardIndex boards={mockBoards} fetchAllBoards={fetchAllBoards} />,
    );
    fireEvent.click(getAllByTestId('boardIndexCard')[0]);

    expect(mockLocation.pathname).toBe(`/board/${mockBoards[0].id}`);
  });

  test('should call `fetchAllBoards` when component did mount', () => {
    renderWithRouter(
      <BoardIndex boards={mockBoards} fetchAllBoards={fetchAllBoards} />,
    );

    expect(fetchAllBoards).toHaveBeenCalled();
  });
});
