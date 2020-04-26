import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/signin"><SignIn /></Route>
        <Route path="/signup"><SignUp /></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
