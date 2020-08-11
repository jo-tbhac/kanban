import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { signOutText } from '../../utils/text';

const SignOutButton = () => {
  return (
    <div className="signOutButton">
      <FontAwesomeIcon icon={['fas', 'sign-out-alt']} className="signOutButton__icon" />
      {signOutText}
    </div>
  );
};

export default SignOutButton;
