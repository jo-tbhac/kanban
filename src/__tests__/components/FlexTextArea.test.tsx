import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import FlexTextArea from '../../components/FlexTextArea';

describe('FlexTextArea component', () => {
  let store: Store;
  let onChange: jest.Mock;
  let value: string = '';

  beforeEach(() => {
    store = storeFactory();
    onChange = jest.fn();
  });

  test('should call `onChange` when user input text', () => {
    const { getByRole } = render(<FlexTextArea value={value} onChange={onChange} />, store);
    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const mockText = 'some text';
    userEvent.type(textarea, mockText);

    expect(onChange).toHaveBeenCalledTimes(mockText.length);
  });

  test('textarea value is equal to dummy HTMLElement value', () => {
    value = 'some text';
    const { getByRole, getByTestId } = render(
      <FlexTextArea value={value} onChange={onChange} />,
      store,
    );
    const textarea = getByRole('textbox') as HTMLTextAreaElement;

    expect(textarea.value).toBe(value);
    expect(getByTestId('dummyTextarea')).toHaveTextContent(value);
  });
});
