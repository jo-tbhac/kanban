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
  const { board, dialog } = state;
  return {
    isIndexVisible: board.isIndexVisible,
    isDialogVisible: dialog.isDialogVisible,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const App = (props: PropsFromRedux) => {
  const { isIndexVisible, isDialogVisible } = props;
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route exact path="/">
            <div className="mainContainer">
              <Header />
              {isIndexVisible ? <BoardIndex /> : <Board />}
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
      {isDialogVisible && <Dialog />}
    </>
  );
};

export default connector(App);
