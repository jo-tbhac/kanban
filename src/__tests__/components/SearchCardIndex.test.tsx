import React from 'react';

import { render, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { SearchCardIndex } from '../../components/SearchCardIndex';

describe('SearchCardIndex component', () => {
  let store: Store;
  let cardIds: number[];
  let keyword: string;

  beforeEach(() => {
    store = storeFactory();
    cardIds = [];
    keyword = '';
  });

  test('should renders component of `SearchCardInfo` if props of `cardIds.length` is zero and `keyword` is not blank', () => {
    keyword = 'k,xsejcnoj';
    const { getByTestId } = render(<SearchCardIndex cardIds={cardIds} keyword={keyword} />, store);
    expect(getByTestId('searchCardInfo')).not.toBeNull();
  });

  test('should renders components of `SearchCard` if props of `cardIds.length` is more than zero', () => {
    cardIds = [1, 3, 4];
    store = storeFactory({
      board: {
        selectedBoard: {
          lists: [
            { id: 1, cards: [{ id: 1, listId: 1 }, { id: 3, listId: 1 }, { id: 4, listId: 1 }] },
          ],
        },
      },
    });

    const { getByTestId, queryByTestId } = render(
      <SearchCardIndex cardIds={cardIds} keyword={keyword} />,
      store,
    );

    expect(getByTestId('searchCardIndex').children).toHaveLength(cardIds.length);
    expect(queryByTestId('searchCardInfo')).toBeNull();
  });
});
