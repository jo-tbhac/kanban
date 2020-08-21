import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import CardStatusIndex from '../../../components/card/CardStatusIndex';
import CardContext from '../../../context/CardContext';

describe('CardStatusIndex component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should render a `CardStatus` that have a props of `icon={[`fas`, `align-left`]}` if `card.description` is not blank', () => {
    const card = { ...mockCard, description: 'jfsemoew' };
    const { getByTestId } = render(
      <CardContext.Provider value={card}>
        <CardStatusIndex />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardStatusIcon')).toHaveAttribute('data-icon', 'align-left');
    expect(getByTestId('cardStatusIcon')).toHaveAttribute('data-prefix', 'fas');
  });

  test('should not render a `CardStatus` if `card.description` is blank', () => {
    const card = { ...mockCard, description: '' };
    const { queryByTestId } = render(
      <CardContext.Provider value={card}>
        <CardStatusIndex />
      </CardContext.Provider>,
      store,
    );

    expect(queryByTestId('cardStatusIcon')).toBeNull();
  });
});
