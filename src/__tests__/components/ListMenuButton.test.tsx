import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockList } from '../../utils/mockData';
import ListMenuButton from '../../components/ListMenuButton';

describe('ListMenuButton component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `ListMenu` when state of `isListMenuVisible` is true', () => {
    const { getByTestId } = render(<ListMenuButton listId={mockList.id} />, store);
    fireEvent.click(getByTestId('listMenuButton'));

    expect(getByTestId('listMenu')).toBeVisible();
  });

  test('should hide `ListMenu` when state of `isListMenuVisible` is false', () => {
    const { queryByTestId } = render(<ListMenuButton listId={mockList.id} />, store);
    expect(queryByTestId('listMenu')).toBeNull();
  });
});
