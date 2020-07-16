import React from 'react';

import { storeFactory, render, fireEvent } from '../../testUtils';
import { Store } from '../../store';
import { SearchCard } from '../../components/SearchCard';
import { mockList, mockCard } from '../../utils/mockData';

describe('SearchCard component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show a `CardDetail` component upon click a `SearchCard` component', () => {
    const cardId = 3;
    const lists = [{ ...mockList, id: 1, cards: [{ ...mockCard, id: cardId, listId: 1 }] }];
    const { getByTestId } = render(<SearchCard lists={lists} cardId={cardId} />, store);

    fireEvent.click(getByTestId(`searchCard-${cardId}`));
    expect(getByTestId('cardDetail')).toBeVisible();
  });

  test('should hide a `CardDetail` component if state of `isCardDetailVisible` is false', () => {
    const cardId = 3;
    const lists = [{ ...mockList, id: 1, cards: [{ ...mockCard, id: cardId, listId: 1 }] }];
    const { queryByTestId } = render(<SearchCard lists={lists} cardId={cardId} />, store);

    expect(queryByTestId('cardDetail')).toBeNull();
  });
});
