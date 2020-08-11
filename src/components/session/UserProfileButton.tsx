import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserProfileContainer from './UserProfileContainer';

const UserProfileButton = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setProfileVisible(true)}
        onKeyPress={() => setProfileVisible(true)}
        className="userProfileButton"
      >
        <FontAwesomeIcon icon={['fas', 'user']} />
      </div>
      {isProfileVisible && <UserProfileContainer closeProfile={() => setProfileVisible(false)} />}
    </>
  );
};

export default UserProfileButton;
