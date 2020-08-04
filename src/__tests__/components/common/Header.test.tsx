import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import Header from '../../../components/common/Header';
import { Store } from '../../../store';

describe('Header component', () => {
  let mockLocation: {pathname: string};
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

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

  test('navigate to `/` when click a home icon', () => {
    const { getByTestId } = renderWithRouter(<Header />);

    fireEvent.click(getByTestId('homeIcon'));

    expect(mockLocation.pathname).toBe('/');
  });
});
