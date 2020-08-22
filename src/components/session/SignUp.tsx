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
  signUp: sessionActions.signUp,
  loadStart: loadingActions.loadStart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SignUp = (props: PropsFromRedux) => {
  const { isSignIn, signUp, loadStart } = props;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onClickSignUp = () => {
    const params = {
      name: username,
      email,
      password,
      passwordConfirmation,
    };

    loadStart();
    signUp(params);
  };

  if (isSignIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signUpContainer">
      <div className="signUpLogo">
        kanban
      </div>
      <div className="signUp">
        <input
          data-testid="userNameTextField"
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="signUp__usernameTextField"
        />
        <input
          data-testid="emailTextField"
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signUp__emailTextField"
        />
        <input
          data-testid="passwordTextField"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signUp__passwordTextField"
        />
        <input
          data-testid="passwordConfirmationTextField"
          type="password"
          placeholder="password confirmation"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          className="signUp__passwordConfirmationTextField"
        />
        <button type="button" onClick={onClickSignUp} className="signUp__button">
          Sign up
        </button>

        <Link to="/signin" className="signUp__linkToSignIn">Move to sign in</Link>
      </div>
    </div>
  );
};

export default connector(SignUp);
