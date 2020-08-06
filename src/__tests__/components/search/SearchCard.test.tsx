import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchCard } from '../../../components/search/SearchCard';
import { mockList, mockCard, mockFile } from '../../../utils/mockData';

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

  test('should render a cover', () => {
    const cardId = 3;
    const lists = [{ ...mockList, id: 1, cards: [{ ...mockCard, id: cardId, listId: 1 }] }];

    store = storeFactory({
      file: {
        files: [{ ...mockFile, id: mockCard.cover.fileId, cardId }],
      },
    });

    const { getByTestId } = render(<SearchCard lists={lists} cardId={cardId} />, store);
    expect(getByTestId('cover')).not.toBeNull();
  });

  test('should not render a cover if `card` does not contain `cover`', () => {
    const cardId = 3;
    const lists = [{
      ...mockList,
      id: 1,
      cards: [{
        ...mockCard,
        id: cardId,
        listId: 1,
        cover: null,
      }],
    }];

    store = storeFactory({
      file: {
        files: [{ ...mockFile, id: mockCard.cover.fileId, cardId }],
      },
    });

    const { queryByTestId } = render(<SearchCard lists={lists} cardId={cardId} />, store);
    expect(queryByTestId('cover')).toBeNull();
  });
});
