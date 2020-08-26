import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as sessionActions from '../../store/session/actions';
import * as loadingActions from '../../store/loading/actions';
import Logo from '../common/Logo';
import TextLink from '../common/TextLink';
import {
  moveToSignInText,
  moveToTesterText,
  userNamePlaceholder,
  emailPlaceholder,
  passwordPlaceholder,
  passwordConfirmationPlaceholder,
} from '../../utils/text';

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

export const SignUp = (props: PropsFromRedux) => {
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
      <Logo />

      <div className="signUp">
        <input
          data-testid="userNameTextField"
          type="text"
          placeholder={userNamePlaceholder}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="signUp__usernameTextField"
        />
        <input
          data-testid="emailTextField"
          type="text"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signUp__emailTextField"
        />
        <input
          data-testid="passwordTextField"
          type="password"
          placeholder={passwordPlaceholder}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signUp__passwordTextField"
        />
        <input
          data-testid="passwordConfirmationTextField"
          type="password"
          placeholder={passwordConfirmationPlaceholder}
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          className="signUp__passwordConfirmationTextField"
        />
        <button type="button" onClick={onClickSignUp} className="signUp__button">
          Sign up
        </button>
        <div className="signUpLinkContainer">
          <TextLink path="/signin" text={moveToSignInText} />
          <TextLink path="/signup" text={moveToTesterText} />
        </div>
      </div>
    </div>
  );
};

export default connector(SignUp);
