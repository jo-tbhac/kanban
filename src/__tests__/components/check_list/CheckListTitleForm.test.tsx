import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { CheckListTitleForm } from '../../../components/check_list/CheckListTitleForm';

describe('CheckListTitleForm component', () => {
  let store: Store;
  let setFormVisible: jest.Mock;
  let updateCheckList: jest.Mock;
  const initialTitle = 'title';
  const checkListId = 1;

  beforeEach(() => {
    store = storeFactory();
    setFormVisible = jest.fn();
    updateCheckList = jest.fn();
  });

  test('should update state `title` upon changed a text field value', () => {
    const { getByTestId } = render(
      <CheckListTitleForm
        checkListId={checkListId}
        initialTitle={initialTitle}
        updateCheckList={updateCheckList}
        setFormVisible={setFormVisible}
      />,
      store,
    );

    const title = 'ceunc;aov';
    const textField = getByTestId('checkListTitleForm') as HTMLInputElement;

    fireEvent.change(textField, { target: { value: title } });
    expect(textField.value).toBe(title);
  });

  test('should call `updateCheckList` upon focus out from text field', () => {
    const { getByTestId } = render(
      <CheckListTitleForm
        checkListId={checkListId}
        initialTitle={initialTitle}
        updateCheckList={updateCheckList}
        setFormVisible={setFormVisible}
      />,
      store,
    );

    const title = 'ceunc;aov';
    const textField = getByTestId('checkListTitleForm') as HTMLInputElement;

    fireEvent.change(textField, { target: { value: title } });
    fireEvent.blur(textField);
    expect(updateCheckList).toHaveBeenCalledWith(checkListId, title);
    expect(setFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `updateCheckList` if state of `title` is equal props of `initialTitle` upon focus out from text field', () => {
    const { getByTestId } = render(
      <CheckListTitleForm
        checkListId={checkListId}
        initialTitle={initialTitle}
        updateCheckList={updateCheckList}
        setFormVisible={setFormVisible}
      />,
      store,
    );

    fireEvent.blur(getByTestId('checkListTitleForm'));
    expect(updateCheckList).not.toHaveBeenCalled();
    expect(setFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `updateCheckList` if state of `title` is blank upon focus out from text field', () => {
    const { getByTestId } = render(
      <CheckListTitleForm
        checkListId={checkListId}
        initialTitle={initialTitle}
        updateCheckList={updateCheckList}
        setFormVisible={setFormVisible}
      />,
      store,
    );

    const title = '';
    const textField = getByTestId('checkListTitleForm') as HTMLInputElement;

    fireEvent.change(textField, { target: { value: title } });
    fireEvent.blur(textField);

    expect(updateCheckList).not.toHaveBeenCalled();
    expect(setFormVisible).toHaveBeenCalledWith(false);
  });
});
