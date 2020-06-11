import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../testUtils';
import Header from '../../components/Header';
import { Store } from '../../store';

describe('<Header />', () => {
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

  test('navigate to `/` when click a home icon', () => {
    const store = storeFactory();
    const { getByTestId } = renderWithRouter(<Header />, store);

    fireEvent.click(getByTestId('homeIcon'));

    expect(mockLocation.pathname).toBe('/');
  });
});
