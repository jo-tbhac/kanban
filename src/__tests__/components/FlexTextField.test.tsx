import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, storeFactory, fireEvent } from '../../testUtils';
import { Store } from '../../store';
import FlexTextField from '../../components/common/FlexTextField';

describe('FlexTextField component', () => {
  let store: Store;
  let onChange: jest.Mock;
  let value: string = '';
  let onBlur: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    onChange = jest.fn();
    onBlur = jest.fn();
  });

  test('should call `onChange` when user input text', () => {
    const { getByRole } = render(<FlexTextField value={value} onChange={onChange} />, store);
    const textField = getByRole('textbox') as HTMLInputElement;
    const mockText = 'some text';
    userEvent.type(textField, mockText);

    expect(onChange).toHaveBeenCalledTimes(mockText.length);
  });

  test('textfield value is equal to dummy HTMLElement value', () => {
    value = 'some text';
    const { getByRole, getByTestId } = render(
      <FlexTextField value={value} onChange={onChange} />,
      store,
    );
    const textField = getByRole('textbox') as HTMLInputElement;

    expect(textField.value).toBe(value);
    expect(getByTestId('dummyTextField')).toHaveTextContent(value);
  });

  test('should call `onBlur` when focus out from a text field', () => {
    const { getByRole } = render(
      <FlexTextField autoFocus onBlur={onBlur} value={value} onChange={onChange} />,
      store,
    );
    const textField = getByRole('textbox') as HTMLInputElement;
    fireEvent.blur(textField);

    expect(onBlur).toHaveBeenCalled();
  });

  test('should focus on a text field if props of `autoFocus` is true', () => {
    const { getByRole } = render(
      <FlexTextField autoFocus onBlur={onBlur} value={value} onChange={onChange} />,
      store,
    );
    const textField = getByRole('textbox') as HTMLInputElement;
    expect(textField).toHaveFocus();
  });

  test('should not focus on a text field if props of `autoFocus` is false', () => {
    const { getByRole } = render(
      <FlexTextField onBlur={onBlur} value={value} onChange={onChange} />,
      store,
    );
    const textField = getByRole('textbox') as HTMLInputElement;
    expect(textField).not.toHaveFocus();
  });
});
