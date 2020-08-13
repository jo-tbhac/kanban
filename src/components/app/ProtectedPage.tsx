import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as backgroundImageActions from '../../store/background_image/actions';

const mapStateToProps = (state: RootState) => {
  const { session } = state;
  return {
    isSignIn: session.isSignIn,
  };
};

const mapDispatchToProps = {
  fetchBackgroundImages: backgroundImageActions.fetchBackgroundImages,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ProtectedPageProps = PropsFromRedux & {
  children: React.ReactElement
}

export const ProtectedPage = (props: ProtectedPageProps) => {
  const { isSignIn, fetchBackgroundImages, children } = props;

  useEffect(() => {
    fetchBackgroundImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
