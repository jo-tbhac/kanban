import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => {
  const { session } = state;
  return {
    email: session.email,
    name: session.name,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const UserProfile = (props: PropsFromRedux) => {
  const { name, email } = props;

  return (
    <div className="userProfile">
      <div className="userProfile__name">{name}</div>
      <div className="userProfile__email">{email}</div>
    </div>
  );
};

export default connector(UserProfile);
