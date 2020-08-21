import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import CardStatusIndex from '../../../components/card/CardStatusIndex';

describe('CardStatusIndex component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should render a `CardStatus` that have a props of `icon={[`fas`, `align-left`]}` if `card.description` is not blank', () => {
    const card = { ...mockCard, description: 'jfsemoew' };
    const { getByTestId } = render(<CardStatusIndex card={card} />, store);

    expect(getByTestId('cardStatusIcon')).toHaveAttribute('data-icon', 'align-left');
    expect(getByTestId('cardStatusIcon')).toHaveAttribute('data-prefix', 'fas');
  });

  test('should not render a `CardStatus` if `card.description` is blank', () => {
    const card = { ...mockCard, description: '' };
    const { queryByTestId } = render(<CardStatusIndex card={card} />, store);

    expect(queryByTestId('cardStatusIcon')).toBeNull();
  });
});
