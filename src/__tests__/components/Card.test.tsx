import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import Card from '../../components/Card';
import { CardContext } from '../../components/List';

describe('card component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `CardDetail` if state of `isCardDetailVisible` is true', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <Card />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('card'));

    expect(getByTestId('cardDetail')).toBeVisible();
  });

  test('should hide `CardDetail` if state of `isCardDetailVisible` is false', () => {
    const { queryByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <Card />
      </CardContext.Provider>,
      store,
    );
    expect(queryByTestId('cardDetail')).toBeNull();
  });
});
