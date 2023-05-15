import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import app from '../firebase.js'
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app) ;
const auth = getAuth(app);
function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = props.auth;

  function logIn(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login successful');
      })
      .catch((error) => {
        console.log('Login error', error);
      });
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={logIn}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        {/* maybe 6 characters */}
        </div>
        <button type="submit" id="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
