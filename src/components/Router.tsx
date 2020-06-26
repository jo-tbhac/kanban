import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import BoardIndex from './BoardIndex';
import Board from './Board';

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
