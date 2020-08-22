import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as sessionActions from '../../store/session/actions';
import * as loadingActions from '../../store/loading/actions';

const mapStateToProps = (state: RootState) => {
  const { session } = state;
  return {
    isSignIn: session.isSignIn,
  };
};

const mapDispatchToProps = {
  signIn: sessionActions.signIn,
  loadStart: loadingActions.loadStart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SignIn = (props: PropsFromRedux) => {
  const { loadStart, signIn, isSignIn } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSignIn = () => {
    const params = { email, password };
    loadStart();
    signIn(params);
  };

  if (isSignIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signInContainer">
      <div className="signInLogo">
        kanban
      </div>
      <div className="signIn">
        <input
          data-testid="emailTextField"
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signIn__emailTextField"
        />
        <input
          data-testid="passwordTextField"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signIn__passwordTextField"
        />
        <button type="button" onClick={onClickSignIn} className="signIn__button">
          Sign in
        </button>

        <Link to="/signup" className="signIn__linkToSignUp">Create account</Link>
      </div>
    </div>
  );
};

export default connector(SignIn);
