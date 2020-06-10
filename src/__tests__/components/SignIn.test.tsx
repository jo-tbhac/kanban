import React, { ReactElement } from 'react';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { storeFactory, render } from '../../testUtils';
import { Store } from '../../store';
import SignIn from '../../components/SignIn';

describe('<SignIn />', () => {
  let store: Store;
  const renderWithRouter = (component: ReactElement) => (
    render(
      <MemoryRouter>
        {component}
      </MemoryRouter>,
      store,
    )
  );

  beforeEach(() => {
    store = storeFactory();
  });

  test('update state of `email` if email text field upon changed', () => {
    const mockText = 'sample@sample.com';
    const { getByTestId } = renderWithRouter(<SignIn />);
    const emailTextField = getByTestId('emailTextField') as HTMLInputElement;
    expect(emailTextField.value).toBe('');

    fireEvent.change(emailTextField, { target: { value: mockText } });
    expect(emailTextField.value).toBe(mockText);
  });

  test('update state of `password` if password text field upon changed', () => {
    const mockText = 'sample_password';
    const { getByTestId } = renderWithRouter(<SignIn />);
    const passwordTextField = getByTestId('passwordTextField') as HTMLInputElement;
    expect(passwordTextField.value).toBe('');

    fireEvent.change(passwordTextField, { target: { value: mockText } });
    expect(passwordTextField.value).toBe(mockText);
  });
});
