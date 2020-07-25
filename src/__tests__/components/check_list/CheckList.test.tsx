import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCheckList } from '../../../utils/mockData';
import { Store } from '../../../store';
import CheckList from '../../../components/check_list/CheckList';

describe('CheckList component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show a CheckListTitleForm component upon press a check list title', () => {
    const { getByTestId, queryByTestId } = render(<CheckList checkList={mockCheckList} />, store);
    fireEvent.click(getByTestId('checkListTitle'));
    expect(queryByTestId('checkListTitle')).toBeNull();
    expect(getByTestId('checkListTitleForm')).not.toBeNull();
  });

  test('should not render a CheckListTitleForm component if state of `isFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = render(<CheckList checkList={mockCheckList} />, store);
    expect(queryByTestId('checkListTitleForm')).toBeNull();
    expect(getByTestId('checkListTitle')).not.toBeNull();
  });
});
