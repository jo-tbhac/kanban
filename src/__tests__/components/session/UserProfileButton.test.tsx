import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import UserProfileButton from '../../../components/session/UserProfileButton';

describe('UserProfileButton component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `UserProfileContainer` upon click a component', () => {
    const { getByRole, getByTestId } = render(<UserProfileButton />, store);
    fireEvent.click(getByRole('button'));
    expect(getByTestId('userProfileContainer')).not.toBeNull();
  });

  test('should not render `UserProfileContainer` if state of `isProfileVisible` is false', () => {
    const { queryByTestId } = render(<UserProfileButton />, store);
    expect(queryByTestId('userProfileContainer')).toBeNull();
  });
});
