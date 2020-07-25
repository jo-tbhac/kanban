import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCheckList } from '../../../utils/mockData';
import { deleteText } from '../../../utils/text';
import { Store } from '../../../store';
import { CheckList } from '../../../components/check_list/CheckList';

describe('CheckList component', () => {
  let store: Store;
  let openDialog: jest.Mock;
  let deleteCheckList: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    openDialog = jest.fn();
    deleteCheckList = jest.fn();
  });

  test('should show a CheckListTitleForm component upon press a check list title', () => {
    const { getByTestId, queryByTestId } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={mockCheckList}
      />,
      store,
    );
    fireEvent.click(getByTestId('checkListTitle'));
    expect(queryByTestId('checkListTitle')).toBeNull();
    expect(getByTestId('checkListTitleForm')).not.toBeNull();
  });

  test('should not render a CheckListTitleForm component if state of `isFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={mockCheckList}
      />,
      store,
    );
    expect(queryByTestId('checkListTitleForm')).toBeNull();
    expect(getByTestId('checkListTitle')).not.toBeNull();
  });

  test('should call `openConfirm` upon press a delete button', () => {
    const { getByText } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={mockCheckList}
      />,
      store,
    );

    fireEvent.click(getByText(deleteText));
    expect(openDialog).toHaveBeenCalled();
  });
});
