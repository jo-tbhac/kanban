import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { CheckListItemForm } from '../../../components/check_list_item/CheckListItemForm';

describe('CheckListItemForm component', () => {
  let store: Store;
  let createCheckListItem: jest.Mock;
  let closeItemForm: jest.Mock;
  const checkListId = 1;

  beforeEach(() => {
    store = storeFactory();
    createCheckListItem = jest.fn();
    closeItemForm = jest.fn();
  });

  test('should update state `name` upon a text area value changed', () => {
    const { getByRole } = render(
      <CheckListItemForm
        createCheckListItem={createCheckListItem}
        closeItemForm={closeItemForm}
        checkListId={checkListId}
      />,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const name = 'fomcfjo n;efw';

    fireEvent.change(textarea, { target: { value: name } });
    expect(textarea.value).toBe(name);
  });

  test('should call `closeItemForm` upon press a cancel button', () => {
    const { getByTestId } = render(
      <CheckListItemForm
        createCheckListItem={createCheckListItem}
        closeItemForm={closeItemForm}
        checkListId={checkListId}
      />,
      store,
    );

    fireEvent.click(getByTestId('buttonCancel'));
    expect(closeItemForm).toHaveBeenCalled();
  });

  test('should call `createCheckListItem` upon press a submit button', () => {
    const { getByTestId, getByRole } = render(
      <CheckListItemForm
        createCheckListItem={createCheckListItem}
        closeItemForm={closeItemForm}
        checkListId={checkListId}
      />,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const name = 'fomcfjo n;efw';

    fireEvent.change(textarea, { target: { value: name } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(closeItemForm).toHaveBeenCalled();
    expect(createCheckListItem).toHaveBeenCalledWith(name, checkListId);
  });

  test('should enabled a submit button when state `name` is not blank', () => {
    const { getByTestId, getByRole } = render(
      <CheckListItemForm
        createCheckListItem={createCheckListItem}
        closeItemForm={closeItemForm}
        checkListId={checkListId}
      />,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const name = 'vithnevoth';

    fireEvent.change(textarea, { target: { value: name } });
    expect(getByTestId('buttonSubmit')).toBeEnabled();
  });

  test('should disabled a submit button when state `name` is not blank', () => {
    const { getByTestId } = render(
      <CheckListItemForm
        createCheckListItem={createCheckListItem}
        closeItemForm={closeItemForm}
        checkListId={checkListId}
      />,
      store,
    );

    expect(getByTestId('buttonSubmit')).toBeDisabled();
  });
});
