import React, { useState } from 'react';
import { logInWithEmailAndPassword } from '../firebase.js';

function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLogin = props.onLogin;
  const handleLogin = (e) => {
    e.preventDefault();
    try{
    logInWithEmailAndPassword(email, password);
    setLogin();
    // onLogin(); // Call the onLogin callback to update the login status in the parent component
    console.log('Login success');
    }catch (error) {
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



// import React, { useState } from 'react';
// import {app, auth , logInWithEmailAndPassword} from '../firebase.js'
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';


// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

// function logIn(e){
//     e.preventDefault();
//     logInWithEmailAndPassword(email, password)
//     console.log("login sucsses")
// }
//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={logIn}>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//         {/* maybe 6 characters */}
//         </div>
//         <button type="submit" id="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;
