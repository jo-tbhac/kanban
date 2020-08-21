import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchCard } from '../../../components/search/SearchCard';
import { mockList, mockCard, mockFile } from '../../../utils/mockData';

describe('SearchCard component', () => {
  let store: Store;
  let openCardDetail: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    openCardDetail = jest.fn();
  });

  test('should call `openCardDetail` with cardId and listId upon click a `SearchCard` component', () => {
    const cardId = 3;
    const listId = 1;
    const lists = [{ ...mockList, id: 1, cards: [{ ...mockCard, id: cardId, listId }] }];
    const { getByTestId } = render(
      <SearchCard lists={lists} cardId={cardId} openCardDetail={openCardDetail} />,
      store,
    );

    fireEvent.click(getByTestId(`searchCard-${cardId}`));
    expect(openCardDetail).toHaveBeenCalledWith({ cardId, listId });
  });

  test('should render a cover', () => {
    const cardId = 3;
    const lists = [{ ...mockList, id: 1, cards: [{ ...mockCard, id: cardId, listId: 1 }] }];

    store = storeFactory({
      file: {
        files: [{ ...mockFile, id: mockCard.cover.fileId, cardId }],
      },
    });

    const { getByTestId } = render(
      <SearchCard lists={lists} cardId={cardId} openCardDetail={openCardDetail} />,
      store,
    );
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

    const { queryByTestId } = render(
      <SearchCard lists={lists} cardId={cardId} openCardDetail={openCardDetail} />,
      store,
    );
    expect(queryByTestId('cover')).toBeNull();
  });
});
