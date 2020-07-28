import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCheckList, mockCheckListItem } from '../../../utils/mockData';
import { deleteText, addCheckListItem } from '../../../utils/text';
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

  test('should render a component `CheckListItemForm` if state `isItemFormVisible` is true', () => {
    const { getByText, getByTestId, queryByText } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={mockCheckList}
      />,
      store,
    );

    fireEvent.click(getByText(addCheckListItem));
    expect(getByTestId('checkListItemForm')).not.toBeNull();
    expect(queryByText(addCheckListItem)).toBeNull();
  });

  test('should not render a component `CheckListItemForm` if state `isItemFormVisible` is false', () => {
    const { getByText, queryByTestId } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={mockCheckList}
      />,
      store,
    );

    expect(queryByTestId('checkListItemForm')).toBeNull();
    expect(getByText(addCheckListItem)).not.toBeNull();
  });

  test('should render components `CheckListItem` as many as `checkList.items`', () => {
    const checkList = {
      ...mockCheckList,
      items: [
        { ...mockCheckListItem, id: 1 },
        { ...mockCheckListItem, id: 2 },
        { ...mockCheckListItem, id: 3 },
      ],
    };

    const { getByTestId } = render(
      <CheckList
        openDialog={openDialog}
        deleteCheckList={deleteCheckList}
        checkList={checkList}
      />,
      store,
    );

    expect(getByTestId('checkListItemContainer').children).toHaveLength(checkList.items.length);
  });
});
