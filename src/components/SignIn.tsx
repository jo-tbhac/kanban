import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <button type="button" className="signIn__button">
          Sign in
        </button>

        <Link to="/signup" className="signIn__linkToSignUp">Create account</Link>
      </div>
    </div>
  );
};

export default SignIn;
