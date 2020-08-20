import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedPage from './ProtectedPage';
import SignIn from '../session/SignIn';
import SignUp from '../session/SignUp';
import Header from '../common/Header';
import BoardIndex from '../board/BoardIndex';
import BoardWrapper from '../board/BoardWrapper';
import NotFound from '../common/404';

const Router = React.memo(() => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin"><SignIn /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route path="/board/:boardId">
        <ProtectedPage>
          <BoardWrapper />
        </ProtectedPage>
      </Route>
      <Route exact path="/">
        <ProtectedPage>
          <>
            <Header />
            <BoardIndex />
          </>
        </ProtectedPage>
      </Route>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
));

export default Router;
