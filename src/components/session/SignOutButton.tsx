import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as sessionActions from '../../store/session/actions';
import { signOutText } from '../../utils/text';

const mapDispatchToProps = {
  signOut: sessionActions.signOut,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SignOutButton = (props: PropsFromRedux) => {
  const { signOut } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={signOut}
      onKeyPress={signOut}
      className="signOutButton"
    >
      <FontAwesomeIcon icon={['fas', 'sign-out-alt']} className="signOutButton__icon" />
      {signOutText}
    </div>
  );
};

export default connector(SignOutButton);
