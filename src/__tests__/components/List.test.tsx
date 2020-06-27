import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockList } from '../../utils/mockData';
import List from '../../components/List';

describe('List component', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `CardForm` if state of `isCardFormVisible` is true', () => {
    const { getByTestId } = render(<List list={mockList} />, store);
    fireEvent.click(getByTestId('addCardButton'));
    expect(getByTestId('cardForm')).toBeVisible();
  });

  test('should hide `CardForm` if state of `isCardFormVisible` is false', () => {
    const { queryByTestId } = render(<List list={mockList} />, store);
    expect(queryByTestId('cardForm')).toBeNull();
  });
});
