import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCard, mockCheckList, mockCheckListItem } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CheckList } from '../../../store/check_list/types';
import { CardCheckListStatusIcon } from '../../../components/card/CardCheckListStatusIcon';
import { CardContext } from '../../../components/card/CardIndexContainer';

describe('CardCheckListStatusIcon component', () => {
  let store: Store;
  let checkLists: CheckList[];

  beforeEach(() => {
    store = storeFactory();
    checkLists = [];
  });

  test('should not render a component if attached check lists is zero', () => {
    const { queryByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardCheckListStatusIcon checkLists={checkLists} />
      </CardContext.Provider>,
      store,
    );

    expect(queryByTestId('cardStatus')).toBeNull();
  });

  test('should have a class name `cardStatus` if checked items count is not equal check list items count', () => {
    checkLists = [
      {
        ...mockCheckList,
        id: 1,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 1, check: true },
          { ...mockCheckListItem, id: 2, check: true },
        ],
      }, {
        ...mockCheckList,
        id: 2,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 3, check: true },
          { ...mockCheckListItem, id: 4, check: false },
        ],
      },
    ];

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardCheckListStatusIcon checkLists={checkLists} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardStatus')).toHaveClass('cardStatus');
  });

  test('should have a class name `cardStatus--complete` if checked items count is equal check list items count', () => {
    checkLists = [
      {
        ...mockCheckList,
        id: 1,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 1, check: true },
          { ...mockCheckListItem, id: 2, check: true },
        ],
      }, {
        ...mockCheckList,
        id: 2,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 3, check: true },
          { ...mockCheckListItem, id: 4, check: true },
        ],
      },
    ];

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardCheckListStatusIcon checkLists={checkLists} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardStatus')).toHaveClass('cardStatus--complete');
  });

  test('should render a count `3/4` if checked items count is `3` and check list items count is `4`', () => {
    checkLists = [
      {
        ...mockCheckList,
        id: 1,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 1, check: true },
          { ...mockCheckListItem, id: 2, check: true },
        ],
      }, {
        ...mockCheckList,
        id: 2,
        cardId: mockCard.id,
        items: [
          { ...mockCheckListItem, id: 3, check: false },
          { ...mockCheckListItem, id: 4, check: true },
        ],
      },
    ];

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardCheckListStatusIcon checkLists={checkLists} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardStatusCount')).toHaveTextContent('3/4');
  });
});
