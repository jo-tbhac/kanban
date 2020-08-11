import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { SignOutButton } from '../../../components/session/SignOutButton';

describe('SignOutButton component', () => {
  let store: Store;
  let signOut: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    signOut = jest.fn();
  });

  test('should call `signOut` upon click a component', () => {
    const { getByRole } = render(<SignOutButton signOut={signOut} />, store);
    fireEvent.click(getByRole('button'));
    expect(signOut).toHaveBeenCalled();
  });
});
