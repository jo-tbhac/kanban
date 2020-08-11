import React, { useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { accountTitle } from '../../utils/text';
import UserProfile from './UserProfile';
import SignOutButton from './SignOutButton';

type UserProfileContainerProps = {
  closeProfile: () => void
}

const UserProfileContainer = (props: UserProfileContainerProps) => {
  const { closeProfile } = props;

  const onClickCallback = useCallback(({ target }) => {
    if (typeof target.className !== 'string') {
      return;
    }
    if (!target.className.includes('userProfile') && !target.className.includes('signOut')) {
      closeProfile();
    }
  }, [closeProfile]);

  useEffect(() => {
    window.addEventListener('click', onClickCallback);
    window.addEventListener('keypress', onClickCallback);
    return () => {
      window.removeEventListener('click', onClickCallback);
      window.removeEventListener('keypress', onClickCallback);
    };
  }, [onClickCallback]);

  return (
    <div className="userProfileContainer">
      <div className="userProfileHeader">
        <div className="userProfileHeader__title">{accountTitle}</div>
        <div
          role="button"
          tabIndex={0}
          onClick={closeProfile}
          onKeyPress={closeProfile}
          className="userProfileHeader__close"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>
      <UserProfile />
      <SignOutButton />
    </div>
  );
};

export default UserProfileContainer;
