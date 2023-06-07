import React, { useState } from 'react';
import { logInWithEmailAndPassword , db } from '../firebase.js';
import { collection, getDocs, query, where} from 'firebase/firestore';

function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const setUserId = props.setUserId ;

  const getUserIdRole = async () => {
    const coll = collection(db, "users");
    const q = query(coll, where("mail", "==", email));
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return { id: doc.id, role: data.role };
  };
  

  const handleLogin = async  (e) => {
    e.preventDefault();
    try{
      const value = await logInWithEmailAndPassword(email, password);
      if(value) 
        {
          const idRole = await getUserIdRole(email) ;
        setUserId(idRole);}
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
