import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import BoardIndex from './BoardIndex';
import Board from './Board';
import Dialog from './Dialog';

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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/board/:boardID">
            <div className="mainContainer">
              <Header />
              <Board />
            </div>
          </Route>
          <Route exact path="/">
            <div className="mainContainer">
              <Header />
              <BoardIndex />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
      {isDialogVisible && <Dialog />}
    </>
  );
};

export default connector(App);
