import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import CheckListForm from '../../../components/check_list/CheckListForm';

describe('CheckListForm component', () => {
  let store: Store;
  let title: string;
  let onChange: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    title = '';
    onChange = jest.fn();
  });

  test('should display a text that provided from props `title`', () => {
    title = 'xewrn;ono';
    const { getByTestId } = render(<CheckListForm title={title} onChange={onChange} />, store);
    const textField = getByTestId('checkListFormTextField') as HTMLInputElement;
    expect(textField.value).toBe(title);
  });

  test('should call `onChange` upon input to a text field', async () => {
    const { getByTestId } = render(<CheckListForm title={title} onChange={onChange} />, store);
    const textField = getByTestId('checkListFormTextField') as HTMLInputElement;
    const inputTitle = 'new checklist';

    await userEvent.type(textField, inputTitle);
    expect(onChange).toHaveBeenCalledTimes(inputTitle.length);
  });
});
