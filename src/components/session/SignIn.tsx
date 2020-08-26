import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as sessionActions from '../../store/session/actions';
import * as loadingActions from '../../store/loading/actions';
import Logo from '../common/Logo';
import TextLink from '../common/TextLink';
import {
  createAccountText,
  moveToTesterText,
  emailPlaceholder,
  passwordPlaceholder,
} from '../../utils/text';

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

export const SignIn = (props: PropsFromRedux) => {
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
      <Logo />

      <div className="signIn">
        <input
          data-testid="emailTextField"
          type="text"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signIn__emailTextField"
        />
        <input
          data-testid="passwordTextField"
          type="password"
          placeholder={passwordPlaceholder}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signIn__passwordTextField"
        />
        <button type="button" onClick={onClickSignIn} className="signIn__button">
          Sign in
        </button>

        <div className="signInLinkContainer">
          <TextLink path="/signup" text={createAccountText} />
          <TextLink path="/signup" text={moveToTesterText} />
        </div>
      </div>
    </div>
  );
};

export default connector(SignIn);
