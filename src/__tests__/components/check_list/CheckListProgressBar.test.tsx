import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCheckListItem } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CheckListItem } from '../../../store/check_list_item/types';
import CheckListProgressBar from '../../../components/check_list/CheckListProgressBar';

describe('CheckListProgressBar component', () => {
  let store: Store;
  let items: CheckListItem[];

  beforeEach(() => {
    store = storeFactory();
    items = [];
  });

  test('should have a class name `checkListProgressBar__fill` if the completion percentage of check list is not 100%', () => {
    items = [
      { ...mockCheckListItem, id: 1, check: false },
      { ...mockCheckListItem, id: 2, check: true },
    ];
    const { getByTestId } = render(
      <CheckListProgressBar items={items} />,
      store,
    );

    expect(getByTestId('checkListProgressBar')).toHaveClass('checkListProgressBar__fill');
  });

  test('should have a class name `checkListProgressBar__fill--complete` if the completion percentage of check list is 100%', () => {
    items = [
      { ...mockCheckListItem, id: 1, check: true },
      { ...mockCheckListItem, id: 2, check: true },
    ];
    const { getByTestId } = render(
      <CheckListProgressBar items={items} />,
      store,
    );

    expect(getByTestId('checkListProgressBar')).toHaveClass('checkListProgressBar__fill--complete');
  });
});
