import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../testUtils';
import BoardIndex from '../../components/BoardIndex';
import { mockBoards } from '../../utils/mockData';
import { Store } from '../../store';

describe('<BoardIndex />', () => {
  let mockLocation: {pathname: string};
  const renderWithRouter = (component: ReactElement, store: Store) => (
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

  test('navigate to `/board/:boardId` when click a board index card', () => {
    const store = storeFactory({ board: { boards: mockBoards } });
    const { getAllByTestId } = renderWithRouter(<BoardIndex />, store);
    fireEvent.click(getAllByTestId('boardIndexCard')[0]);


    expect(mockLocation.pathname).toBe(`/board/${mockBoards[0].id}`);
  });
});
