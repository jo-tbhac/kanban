import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SignUp from '../../components/SignUp';

describe('<SignUp />', () => {
  const renderWithRouter = (component: ReactElement) => (
    render(
      <MemoryRouter>
        {component}
      </MemoryRouter>,
    )
  );

  test('update state of `email` if email text field upon changed', () => {
    const mockText = 'sample@sample.com';
    const { getByTestId } = renderWithRouter(<SignUp />);
    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    expect(emailTextField.value).toBe('');

    fireEvent.change(emailTextField, { target: { value: mockText } });
    expect(emailTextField.value).toBe(mockText);
  });

  test('update state of `password` if password text field upon changed', () => {
    const mockText = 'sample_password';
    const { getByTestId } = renderWithRouter(<SignUp />);
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    expect(passwordTextField.value).toBe('');

    fireEvent.change(passwordTextField, { target: { value: mockText } });
    expect(passwordTextField.value).toBe(mockText);
  });

  test('update state of `username` if username text field upon changed', () => {
    const mockText = 'foo bar';
    const { getByTestId } = renderWithRouter(<SignUp />);
    const userNameTextField = getByTestId('userNameTextField') as HTMLInputElement;
    expect(userNameTextField.value).toBe('');

    fireEvent.change(userNameTextField, { target: { value: mockText } });
    expect(userNameTextField.value).toBe(mockText);
  });

  test('update state of `passwordConfirmation` if passwordConfirmation text field upon changed', () => {
    const mockText = 'sample_password_confirmation';
    const { getByTestId } = renderWithRouter(<SignUp />);
    const passwordConfirmationTextField = getByTestId('passwordConfirmationTextField') as HTMLInputElement;
    expect(passwordConfirmationTextField.value).toBe('');

    fireEvent.change(passwordConfirmationTextField, { target: { value: mockText } });
    expect(passwordConfirmationTextField.value).toBe(mockText);
  });
});
