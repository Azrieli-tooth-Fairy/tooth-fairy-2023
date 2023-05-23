//daniel
import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import LogOut from './components/LogOut';
import Footer from './components/Footer';
import ApptList from './components/ApptList';
import ApptDetails from './components/ApptDetails';
import TicketForm from './components/TicketForm';
import ClinicBookingPage from './components/ClinicBookingPage';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    // Perform login logic
    // For simplicity, let's assume login is successful
    setIsLoggedIn(true);
  };

  const isAuth = (value) => {
    setIsLoggedIn(value) 
  }

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <div id="all">
      <div className="App" >
        
        <BrowserRouter>
        {isLoggedIn ? <NavBar/> : <></>}
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} isAuth = {isAuth}/>} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="apptDetails" element={<ApptDetails />} />
              <Route path="ticket_form" element={<TicketForm />} />
              <Route path="Clinic_Booking_page" element={<ClinicBookingPage />} />
              <Route path="*" element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} isAuth = {isAuth}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

// import './App.css';
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// import Header from './components/Header';
// import NavBar from './components/NavBar';
// import LogIn from './components/LogIn';
// import SignIn from './components/SignIn';
// import LogOut from './components/LogOut';
// import Footer from './components/Footer';
// import ApptList from './components/ApptList';
// import ApptDetails from './components/ApptDetails';
// import TicketForm from './components/TicketForm';
// import ClinicBookingPage from './components/ClinicBookingPage';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <div id="all">
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//           <Route
//               path="/"
//               element={
//                 isLoggedIn ? (
//                   <div>
//                     <NavBar />
//                     <Outlet />
//                   </div>
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             >
//               <Route path="login" element={<LogIn onLogin={handleLogin} />} />
//               <Route path="apptList" element={<ApptList />} />
//               <Route path="apptDetails" element={<ApptDetails />} />
//               <Route path="ticketForm" element={<TicketForm />} />
//               <Route path="clinicBookingPage" element={<ClinicBookingPage />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// }

// export default App;



// import './App.css';

// import Header from './components/Header'
// import NavBar from './components/NavBar'
// import LogIn from './components/LogIn'
// import SignIn from './components/SignIn'
// import LogOut from './components/LogOut'
// import Footer from './components/Footer'
// import ApptList from './components/ApptList'
// import ApptDetails from './components/ApptDetails'
// import TicketForm from './components/TicketForm'
// import ClinicBookingPage from './components/ClinicBookingPage'
// import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

// function App() {
//   const isLoggedIn = false; // Set this value based on the user's login status
//   return (
//     <div id = "all">
//       <div className="App">
//       {/* <Header/> */}
//       {/* <NavBar/> */}
//       {/* <LogIn auth = {auth}/> */}
//       {/* <SignIn/> */}
//       {/* <Footer/> */}
//       <BrowserRouter>
//         <Routes>
//             {/* <Route path="/" element={<div><NavBar/><Outlet/></div>}> */}
//             <Route path="/" element={<Outlet/>}>
//               <Route index element={<LogIn />} />
//               <Route path="sign_in" element={<SignIn/>} />
//               {/* <Route path="apptList" element={<ApptList />} /> */}
//               {/* <Route path="navbar" element={<NavBar />} /> */}
//               <Route path="navbar" element={isLoggedIn ? <NavBar /> : <Navigate to="/login" />} />
//               <Route path="apptDetails" element={<ApptDetails/>} />
//               <Route path="ticket_form" element={<TicketForm/>} />
//               <Route path="Cinic_Booking_page" element={<ClinicBookingPage/>} />
//               <Route path="*" element={<LogIn/>} />
//             </Route>
//         </Routes>
//       </BrowserRouter>
//       </div>
//     </div>
//   );
// }
// //create context \ global values
// export default App;


// import {logInWithEmailAndPassword, auth} from "../firebase_db"

// // import {  auth, signInWithGoogle } from "firebase";
// // import { useAuthState } from "react-firebase-hooks/auth";
// import "./Login.css";
// function Login(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const setAuth = props.setAuth ;
//   //const [loading, isAuthenticated] = useAuthState(auth);
//   const navigate = useNavigate(); 
//   const doLogin = (e) =>{
//     e.preventDefault();
//     logInWithEmailAndPassword(email, password, setAuth)
//   }

//   // useEffect(() => {
//   //   if (loading) {
//   //     // maybe trigger a loading screen
//   //     return;
//   //   }
//   //   if (isAuthenticated) navigate("/dashboard");
//   // }, [isAuthenticated, loading]);
//   console.log(props) ;

//   return (
//     <div className="login">
//       <div className="login__container">
//         <input
//           type="text"
//           className="login__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="login__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button
//           className="login__btn"
//           onClick={doLogin}
//         >
//           Login
//         </button>

//         <div>
//           <Link to="/reset">Forgot Password</Link>
//         </div>
//         <div>
//           Don't have an account? <Link to="/SignUp">Register</Link> now.
//         </div>
//       </div>
//     </div>
//   );
// }