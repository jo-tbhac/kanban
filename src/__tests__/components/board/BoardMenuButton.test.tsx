import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import BoardMenuButton from '../../../components/board/BoardMenuButton';

describe('BoardMenuButton component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should render a component if current location is `/board/:boardId`', () => {
    const { getByTestId } = renderWithRouter(<BoardMenuButton />, store, ['/board/1']);
    expect(getByTestId('boardMenuButton')).not.toBeNull();
  });

  test('should not render a component if current location is not `/board/:boardId`', () => {
    const { queryByTestId } = renderWithRouter(<BoardMenuButton />, store, ['/']);
    expect(queryByTestId('boardMenuButton')).toBeNull();
  });

  test('should show `BoardMenu` upon click a component', () => {
    const { getByTestId } = renderWithRouter(<BoardMenuButton />, store, ['/board/1']);
    fireEvent.click(getByTestId('boardMenuButton'));
    expect(getByTestId('slideInMenu')).not.toBeNull();
  });

  test('should not render `BoardMenu` if state `isMenuVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(<BoardMenuButton />, store, ['/board/1']);
    expect(queryByTestId('slideInMenu')).toBeNull();
  });
});
