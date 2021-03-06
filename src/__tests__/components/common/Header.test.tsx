import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Header } from '../../../components/common/Header';
import { Store } from '../../../store';

describe('Header component', () => {
  let mockLocation: {pathname: string};
  let store: Store;
  let loadStart: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    loadStart = jest.fn();
  });

  const renderWithRouter = (component: ReactElement, entries: string[]) => (
    render(
      <MemoryRouter initialEntries={entries}>
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
    const entries = ['/board/1'];
    const { getByTestId } = renderWithRouter(<Header loadStart={loadStart} />, entries);
    fireEvent.click(getByTestId('homeIcon'));
    expect(mockLocation.pathname).toBe('/');
  });

  test('should call `loadStart` upon click a home icon', () => {
    const entries = ['/board/1'];
    const { getByTestId } = renderWithRouter(<Header loadStart={loadStart} />, entries);
    fireEvent.click(getByTestId('homeIcon'));
    expect(loadStart).toHaveBeenCalled();
  });

  test('should not call `loadStart` if current location is `/` upon click a home icon', () => {
    const entries = ['/'];
    const { getByTestId } = renderWithRouter(<Header loadStart={loadStart} />, entries);
    fireEvent.click(getByTestId('homeIcon'));
    expect(loadStart).not.toHaveBeenCalled();
  });
});
