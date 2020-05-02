import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import BoardIndex from './BoardIndex';

const Main = () => (
  <div className="mainContainer">
    <Header />
    <BoardIndex />
  </div>
);

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
