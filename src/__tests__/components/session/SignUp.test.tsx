import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter, fireEvent } from '../../../testUtils';
import { moveToSignInText, moveToTesterText } from '../../../utils/text';
import { SignUp } from '../../../components/session/SignUp';
import { Store } from '../../../store';

describe('SignUp component', () => {
  let store: Store;
  let signUp: jest.Mock;
  let loadStart: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    signUp = jest.fn();
    loadStart = jest.fn();
  });

  test('update state of `email` if email text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );

    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    expect(emailTextField.value).toBe('');

    const mockText = 'sample@sample.com';
    fireEvent.change(emailTextField, { target: { value: mockText } });
    expect(emailTextField.value).toBe(mockText);
  });

  test('update state of `password` if password text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );

    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    expect(passwordTextField.value).toBe('');

    const mockText = 'sample_password';
    fireEvent.change(passwordTextField, { target: { value: mockText } });
    expect(passwordTextField.value).toBe(mockText);
  });

  test('update state of `username` if username text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );

    const userNameTextField = getByTestId('userNameTextField') as HTMLInputElement;
    expect(userNameTextField.value).toBe('');

    const mockText = 'foo bar';
    fireEvent.change(userNameTextField, { target: { value: mockText } });
    expect(userNameTextField.value).toBe(mockText);
  });

  test('update state of `passwordConfirmation` if passwordConfirmation text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );

    const passwordConfirmationTextField = getByTestId('passwordConfirmationTextField') as HTMLInputElement;
    expect(passwordConfirmationTextField.value).toBe('');

    const mockText = 'sample_password_confirmation';
    fireEvent.change(passwordConfirmationTextField, { target: { value: mockText } });
    expect(passwordConfirmationTextField.value).toBe(mockText);
  });

  test('should call `signUp` with input params upon click a sign up button', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );

    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    const userNameTextField = getByTestId('userNameTextField') as HTMLInputElement;
    const passwordConfirmationTextField = getByTestId('passwordConfirmationTextField') as HTMLInputElement;

    const email = 'email@sample.com';
    const password = 'password';
    const name = 'john';
    const passwordConfirmation = 'passwordConfirmation';

    fireEvent.change(emailTextField, { target: { value: email } });
    fireEvent.change(passwordTextField, { target: { value: password } });
    fireEvent.change(userNameTextField, { target: { value: name } });
    fireEvent.change(passwordConfirmationTextField, { target: { value: passwordConfirmation } });

    fireEvent.click(getByText('Sign up'));
    expect(signUp).toHaveBeenCalledWith({
      email,
      name,
      password,
      passwordConfirmation,
    });
  });

  test('should call `loadStart` upon click a sign in button', () => {
    const { getByText } = renderWithRouter(
      <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />,
      store,
    );
    fireEvent.click(getByText('Sign up'));
    expect(loadStart).toHaveBeenCalled();
  });

  test('should navigate to `/` if props of `isSignIn` is true', () => {
    const { getByTestId } = renderWithRouter(
      <>
        <Route exact path="/">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignUp isSignIn signUp={signUp} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signup'],
    );

    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/signin` upon click a text `既にアカウントをお持ちの方`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/signin">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signup'],
    );

    fireEvent.click(getByText(moveToSignInText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/tester` upon click a text `テストアカウントを使用する`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/tester">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignUp isSignIn={false} signUp={signUp} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signup'],
    );

    fireEvent.click(getByText(moveToTesterText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });
});
