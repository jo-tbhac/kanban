import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import Board from '../../components/Board';

describe('<Board>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `ListForm` when state of `isListFormVisible` is true', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(<Board />, store);
    fireEvent.click(getByTestId('addListButton'));

    expect(getByTestId('listForm')).toBeVisible();
    expect(queryByTestId('addListButton')).toBeNull();
  });

  test('should hide `ListForm` when state of `isListFormVisible` is false', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(<Board />, store);

    expect(getByTestId('addListButton')).toBeVisible();
    expect(queryByTestId('listForm')).toBeNull();
  });
});
