import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SignIn from '../../components/SignIn';

describe('<SignIn />', () => {
  test('update state of `email` if email text field upon changed', () => {
    const mockText = 'sample@sample.com';
    const { getByTestId } = render(<SignIn />);
    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    expect(emailTextField.value).toBe('');

    fireEvent.change(emailTextField, { target: { value: mockText } });
    expect(emailTextField.value).toBe(mockText);
  });

  test('update state of `password` if password text field upon changed', () => {
    const mockText = 'sample_password';
    const { getByTestId } = render(<SignIn />);
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    expect(passwordTextField.value).toBe('');

    fireEvent.change(passwordTextField, { target: { value: mockText } });
    expect(passwordTextField.value).toBe(mockText);
  });
});
