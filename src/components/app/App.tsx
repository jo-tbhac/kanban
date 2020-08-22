import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as sessionActions from '../../store/session/actions';
import Dialog from '../common/Dialog';
import Loading from '../common/Loading';
import Router from './Router';

const mapStateToProps = (state: RootState) => {
  const { dialog, loading } = state;
  return {
    isDialogVisible: dialog.isDialogVisible,
    ready: loading.ready,
  };
};

const mapDispatchToProps = {
  fetchAuthState: sessionActions.fetchAuthState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const App = (props: PropsFromRedux) => {
  const { isDialogVisible, ready, fetchAuthState } = props;

  useEffect(() => {
    fetchAuthState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return (
    <>
      <Router />
      {isDialogVisible && <Dialog />}
    </>
  );
};

export default connector(App);
