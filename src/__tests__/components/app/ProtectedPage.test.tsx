import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { storeFactory, render } from '../../../testUtils';
import { Store } from '../../../store';
import { ProtectedPage } from '../../../components/app/ProtectedPage';

describe('ProtectedPage component', () => {
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

  test('redirect to `/signin` if props of `isSignIn` is false', () => {
    const children = <div data-testid="testChildren" />;
    const { queryByTestId } = renderWithRouter(
      <ProtectedPage isSignIn={false}>
        {children}
      </ProtectedPage>,
    );

    expect(mockLocation.pathname).toBe('/signin');
    expect(queryByTestId('testChildren')).toBeNull();
  });

  test('does not redirect to `/signin` if props of `isSignIn` is true', () => {
    const children = <div data-testid="testChildren" />;
    const { getByTestId } = renderWithRouter(
      <ProtectedPage isSignIn>
        {children}
      </ProtectedPage>,
    );

    expect(mockLocation.pathname).not.toBe('/signin');
    expect(getByTestId('testChildren')).not.toBeNull();
  });
});
