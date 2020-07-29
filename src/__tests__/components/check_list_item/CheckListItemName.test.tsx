import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCheckListItem } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CheckListItemName } from '../../../components/check_list_item/CheckListItemName';

describe('CheckListItemName component', () => {
  let store: Store;
  let updateCheckListItem: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    updateCheckListItem = jest.fn();
  });

  test('should have a class name `checkListItemName__text--checked` if `item.check` is true', () => {
    const item = { ...mockCheckListItem, check: true };
    const { getByText } = render(
      <CheckListItemName item={item} updateCheckListItem={updateCheckListItem} />,
      store,
    );
    expect(getByText(mockCheckListItem.name)).toHaveClass('checkListItemName__text--checked');
  });

  test('should have a class name `checkListItemName__text` if `item.check` is false', () => {
    const item = { ...mockCheckListItem, check: false };
    const { getByText } = render(
      <CheckListItemName item={item} updateCheckListItem={updateCheckListItem} />,
      store,
    );
    expect(getByText(mockCheckListItem.name)).toHaveClass('checkListItemName__text');
  });

  test('should render an item name form if state of `isFormVisible` is true', () => {
    const { getByTestId, queryByTestId, getByRole } = render(
      <CheckListItemName item={mockCheckListItem} updateCheckListItem={updateCheckListItem} />,
      store,
    );

    fireEvent.click(getByTestId('checkListItemName'));
    expect(getByRole('textbox')).not.toBeNull();
    expect(queryByTestId('checkListItemName')).toBeNull();
  });

  test('should not render an item name form if state of `isFormVisible` is false', () => {
    const { getByTestId, queryByRole } = render(
      <CheckListItemName item={mockCheckListItem} updateCheckListItem={updateCheckListItem} />,
      store,
    );
    expect(queryByRole('textbox')).toBeNull();
    expect(getByTestId('checkListItemName')).not.toBeNull();
  });

  test('should call `updateCheckListItem` upon focus out from text area', () => {
    const { getByTestId, getByRole } = render(
      <CheckListItemName item={mockCheckListItem} updateCheckListItem={updateCheckListItem} />,
      store,
    );
    const name = ';fexkfeofmoe';
    fireEvent.click(getByTestId('checkListItemName'));

    const textarea = getByRole('textbox');
    fireEvent.change(textarea, { target: { value: name } });
    fireEvent.blur(textarea);

    expect(updateCheckListItem).toHaveBeenCalledWith(
      name,
      mockCheckListItem.id,
      mockCheckListItem.checkListId,
    );
  });

  test('should not call `updateCheckListItem` if state of `name` is blank upon focus out from text area', () => {
    const { getByTestId, getByRole } = render(
      <CheckListItemName item={mockCheckListItem} updateCheckListItem={updateCheckListItem} />,
      store,
    );

    fireEvent.click(getByTestId('checkListItemName'));
    const textarea = getByRole('textbox');

    fireEvent.change(textarea, { target: { value: '' } });
    fireEvent.blur(textarea);

    expect(updateCheckListItem).not.toHaveBeenCalled();
  });

  test('should not call `updateCheckListItem` if state of `name` is equal to props of `item.name` upon focus out from text area', () => {
    const { getByTestId, getByRole } = render(
      <CheckListItemName item={mockCheckListItem} updateCheckListItem={updateCheckListItem} />,
      store,
    );

    fireEvent.click(getByTestId('checkListItemName'));
    fireEvent.blur(getByRole('textbox'));

    expect(updateCheckListItem).not.toHaveBeenCalled();
  });
});
