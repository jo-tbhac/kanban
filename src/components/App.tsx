import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import BoardIndex from './BoardIndex';
import Board from './Board';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    isIndexVisible: board.isIndexVisible,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Main = connector((props: PropsFromRedux) => {
  const { isIndexVisible } = props;

  return (
    <div className="mainContainer">
      <Header />
      {isIndexVisible
        ? <BoardIndex />
        : <Board />}
    </div>
  );
});

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/signin"><SignIn /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route exact path="/"><Main /></Route>
    </Switch>
  </BrowserRouter>
);

export default App;
