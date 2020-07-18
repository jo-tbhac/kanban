import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from '../session/SignIn';
import SignUp from '../session/SignUp';
import Header from '../common/Header';
import BoardIndex from '../board/BoardIndex';
import Board from '../board/Board';

const Router = React.memo(() => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/signin"><SignIn /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route path="/board/:boardId">
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
));

export default Router;
