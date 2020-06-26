import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import Dialog from './Dialog';
import Router from './Router';

const mapStateToProps = (state: RootState) => {
  const { dialog } = state;
  return {
    isDialogVisible: dialog.isDialogVisible,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const App = (props: PropsFromRedux) => {
  const { isDialogVisible } = props;
  return (
    <>
      <Router />
      {isDialogVisible && <Dialog />}
    </>
  );
};

export default connector(App);
