import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCheckListItem } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CheckListItem } from '../../../components/check_list_item/CheckListItem';

describe('CheckListItem component', () => {
  let store: Store;
  let deleteCheckListItem: jest.Mock;
  let openDialog: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    deleteCheckListItem = jest.fn();
    openDialog = jest.fn();
  });

  test('should call `openDialog` upon press a delete button', () => {
    const { getByTestId } = render(
      <CheckListItem
        item={mockCheckListItem}
        deleteCheckListItem={deleteCheckListItem}
        openDialog={openDialog}
      />,
      store,
    );

    fireEvent.click(getByTestId('checkListItemDelete'));
    expect(openDialog).toHaveBeenCalled();
  });
});
