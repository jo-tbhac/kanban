import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import UserProfileContainer from '../../../components/session/UserProfileContainer';

describe('UserProfileContainer component', () => {
  let store: Store;
  let closeProfile: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    closeProfile = jest.fn();
  });

  test('should call `closeProfile` upon click a close button', () => {
    const { getByTestId } = render(<UserProfileContainer closeProfile={closeProfile} />, store);
    fireEvent.click(getByTestId('userProfileCloseButton'));
    expect(closeProfile).toHaveBeenCalled();
  });

  test('should call `closeProfile` upon click a component that does not have a class name `userProfile` or `signOut`', () => {
    const { getByTestId } = render(
      <>
        <div data-testid="test" className="test" />
        <UserProfileContainer closeProfile={closeProfile} />
      </>,
      store,
    );

    fireEvent.click(getByTestId('test'));
    expect(closeProfile).toHaveBeenCalled();
  });

  test('should not call `closeProfile` upon click a component that has a class name `userProfile`', () => {
    const { getByTestId } = render(<UserProfileContainer closeProfile={closeProfile} />, store);
    fireEvent.click(getByTestId('userProfileContainer'));
    expect(closeProfile).not.toHaveBeenCalled();
  });
});
