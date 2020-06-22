import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import Card from '../../components/Card';

describe('card component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `CardDetail` if state of `isCardDetailVisible` is true', () => {
    const { getByTestId } = render(<Card card={mockCard} />, store);
    fireEvent.click(getByTestId('card'));

    expect(getByTestId('cardDetail')).toBeVisible();
  });

  test('should hide `CardDetail` if state of `isCardDetailVisible` is false', () => {
    const { queryByTestId } = render(<Card card={mockCard} />, store);
    expect(queryByTestId('cardDetail')).toBeNull();
  });
});
