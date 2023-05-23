import React, { useState } from 'react';
import { logInWithEmailAndPassword } from '../firebase.js';

function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const setLogin = props.isAuth;

  const handleLogin = (e) => {
    e.preventDefault();
    try{
      logInWithEmailAndPassword(email, password, setLogin);
      // setLogin(true);
      // onLogin(); // Call the onLogin callback to update the login status in the parent component
      // console.log('Login success');
    }catch (error) {
      alert(error.message);
      console.error('Error submitting user:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
