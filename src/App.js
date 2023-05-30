
import React, { useState } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import ListOfPatient from './components/ListOfPatient';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import ApptList from './components/ApptList';
import ApptDetails from './components/ApptDetails';
import TicketForm from './components/TicketForm';
import ClinicBookingPage from './components/ClinicBookingPage';
import EmergenceAppt from './components/EmergenceAppt'
import CancelAppointment from './components/CancelAppointment'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  var userId = 0 ;
  var role = "" ;
  const handleLogin = () => {
    // Perform login logic
    // For simplicity, let's assume login is successful
    setIsLoggedIn(true);
  };

  const setUserId = (userId_role) => {
    setIsLoggedIn(true) 
    userId = userId_role.id ;
    role = userId_role.role ;
  };

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
              <Route index element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} setUserId = {setUserId}/>} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="apptList" element={<ApptList />} />
              <Route path="ticket_form" element={<TicketForm />} />
              <Route path="list_of_patient" element={<ListOfPatient />} />
              <Route path="Clinic_Booking_page" element={<ClinicBookingPage />} />
              <Route path="emergence_appt" element={<EmergenceAppt />} />
              <Route path="cancel_appointment" element={<CancelAppointment />} />
              <Route path="*" element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} setUserId = {setUserId}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;