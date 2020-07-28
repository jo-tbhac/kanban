import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCheckListItem } from '../../../utils/mockData';
import { Store } from '../../../store';
import CheckListItem from '../../../components/check_list_item/CheckListItem';

describe('CheckListItem component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should have a class name `checkListItem__name--checked` if `item.check` is true', () => {
    const item = { ...mockCheckListItem, check: true };
    const { getByText } = render(<CheckListItem item={item} />, store);
    expect(getByText(mockCheckListItem.name)).toHaveClass('checkListItem__name--checked');
  });

  test('should have a class name `checkListItem__name` if `item.check` is false', () => {
    const item = { ...mockCheckListItem, check: false };
    const { getByText } = render(<CheckListItem item={item} />, store);
    expect(getByText(mockCheckListItem.name)).toHaveClass('checkListItem__name');
  });
});
