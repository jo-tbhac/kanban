import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import BoardIndexCard from '../../../components/board/BoardIndexCard';
import { mockBoard } from '../../../utils/mockData';
import { Store } from '../../../store';

describe('BoardIndex component', () => {
  let store: Store;
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
  });

  test('navigate to `/board/:boardId` when click a board index card', () => {
    const { getByTestId } = renderWithRouter(<BoardIndexCard board={mockBoard} />);
    fireEvent.click(getByTestId('boardIndexCard'));

    expect(mockLocation.pathname).toBe(`/board/${mockBoard.id}`);
  });
});
