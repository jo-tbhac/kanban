import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => {
  const { session } = state;
  return {
    isSignIn: session.isSignIn,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ProtectedPageProps = PropsFromRedux & {
  children: React.ReactElement
}

const ProtectedPage = (props: ProtectedPageProps) => {
  const { isSignIn, children } = props;

  if (!isSignIn) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="mainContainer">
      {children}
    </div>
  );
};

export default connector(ProtectedPage);
