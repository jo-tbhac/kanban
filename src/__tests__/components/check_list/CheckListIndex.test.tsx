import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { mockCard, mockCheckList } from '../../../utils/mockData';
import CardContext from '../../../context/CardContext';
import { CheckListIndex } from '../../../components/check_list/CheckListIndex';

describe('CheckListIndex component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should render components as meny as state of `checkLists.length`', () => {
    const checkLists = [
      { ...mockCheckList, id: 1, cardId: mockCard.id },
      { ...mockCheckList, id: 2, cardId: mockCard.id },
      { ...mockCheckList, id: 3, cardId: 49 },
    ];

    const { getAllByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CheckListIndex checkLists={checkLists} />
      </CardContext.Provider>,
      store,
    );
    expect(getAllByTestId('checkList')).toHaveLength(2);
  });
});
