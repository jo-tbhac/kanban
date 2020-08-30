import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter, fireEvent } from '../../../testUtils';
import { createAccountText, moveToTesterText } from '../../../utils/text';
import { Store } from '../../../store';
import { SignIn } from '../../../components/session/SignIn';

describe('SignIn component', () => {
  let store: Store;
  let signIn: jest.Mock;
  let loadStart: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    signIn = jest.fn();
    loadStart = jest.fn();
  });

  test('update state of `email` if email text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />,
      store,
    );

    const mockText = 'sample@sample.com';
    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    expect(emailTextField.value).toBe('');

    fireEvent.change(emailTextField, { target: { value: mockText } });
    expect(emailTextField.value).toBe(mockText);
  });

  test('update state of `password` if password text field upon changed', () => {
    const { getByTestId } = renderWithRouter(
      <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />,
      store,
    );
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    expect(passwordTextField.value).toBe('');

    const mockText = 'sample_password';
    fireEvent.change(passwordTextField, { target: { value: mockText } });
    expect(passwordTextField.value).toBe(mockText);
  });

  test('should call `signIn` with input email and password upon click a sign in button', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />,
      store,
    );
    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;

    const email = 'sample@sample.com';
    const password = 'sample_password';
    fireEvent.change(emailTextField, { target: { value: email } });
    fireEvent.change(passwordTextField, { target: { value: password } });

    fireEvent.click(getByText('Sign in'));
    expect(signIn).toHaveBeenCalledWith({ email, password });
  });

  test('should call `loadStart` upon click a sign in button', () => {
    const { getByText } = renderWithRouter(
      <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />,
      store,
    );
    fireEvent.click(getByText('Sign in'));
    expect(loadStart).toHaveBeenCalled();
  });

  test('should navigate to `/` if props of `isSignIn` is true', () => {
    const { getByTestId } = renderWithRouter(
      <>
        <Route exact path="/">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignIn isSignIn signIn={signIn} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signin'],
    );

    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/signup` upon click a text `アカウントを作成する`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/signup">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signin'],
    );

    fireEvent.click(getByText(createAccountText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/tester` upon click a text `テストアカウントを使用する`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/tester">
          <div data-testid="navigateTest" />
        </Route>
        <Route>
          <SignIn isSignIn={false} signIn={signIn} loadStart={loadStart} />
        </Route>
      </>,
      store,
      ['/signin'],
    );

    fireEvent.click(getByText(moveToTesterText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });
});
