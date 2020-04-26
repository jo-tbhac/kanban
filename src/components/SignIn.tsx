import React, { useState } from 'react';

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
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signIn__emailTextField"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signIn__passwordTextField"
        />
        <button type="button" className="signIn__button">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
