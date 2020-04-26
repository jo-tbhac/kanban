import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

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
        <button type="button" className="signUp__button">
          Sign up
        </button>

        <Link to="/signin" className="signUp__linkToSignIn">Move to sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
