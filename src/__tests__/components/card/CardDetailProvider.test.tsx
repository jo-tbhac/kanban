import React from 'react';

import { storeFactory, render } from '../../../testUtils';
import { Store } from '../../../store';
import { List } from '../../../store/list/types';
import { CardDetailProvider } from '../../../components/card/CardDetailProvider';
import { mockList, mockCard } from '../../../utils/mockData';

describe('CardDetailProvider component', () => {
  let store: Store;
  let lists: List[];

  beforeEach(() => {
    store = storeFactory();
    lists = [];
  });

  test('should render a `CardDetail` component if props of `isDetailVisible` is true and target card found', () => {
    const target = { listId: 1, cardId: 2 };
    lists = [
      {
        ...mockList,
        id: target.listId,
        cards: [
          {
            ...mockCard,
            id: target.cardId,
            listId: target.listId,
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <CardDetailProvider lists={lists} target={target} isDetailVisible />,
      store,
    );
    expect(getByTestId('cardDetail')).not.toBeNull();
  });

  test('should not render a `CardDetail` component if props of `isDetailVisible` is false and target card found', () => {
    const target = { listId: 1, cardId: 2 };
    lists = [
      {
        ...mockList,
        id: target.listId,
        cards: [
          {
            ...mockCard,
            id: target.cardId,
            listId: target.listId,
          },
        ],
      },
    ];

    const { queryByTestId } = render(
      <CardDetailProvider lists={lists} target={target} isDetailVisible={false} />,
      store,
    );
    expect(queryByTestId('cardDetail')).toBeNull();
  });

  test('should not render a `CardDetail` component if props of `isDetailVisible` is true and target card did not find', () => {
    const target = { listId: 1, cardId: 2 };
    lists = [
      {
        ...mockList,
        id: target.listId,
        cards: [
          {
            ...mockCard,
            id: 3,
            listId: target.listId,
          },
        ],
      },
    ];

    const { queryByTestId } = render(
      <CardDetailProvider lists={lists} target={target} isDetailVisible />,
      store,
    );
    expect(queryByTestId('cardDetail')).toBeNull();
  });
});
