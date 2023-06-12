
import React, { useState } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import ListOfPatient from './components/ListOfPatient';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import CancelSundayClinic from './components/CancelSundayClinic'
import ApptList from './components/ApptList';
import TicketForm from './components/TicketForm';
import PatientForm from './components/PatientForm';
import ClinicBookingPage from './components/ClinicBookingPage';
import EmergenceAppt from './components/EmergenceAppt';
import CancelAppointment from './components/CancelAppointment';
import DeleteUser from './components/DeleteUser'
import PatientSw from './components/PatientSw'
import StatusChange from './components/StatusChange'


import SwList from './components/SwList';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const setUserIdState = (userId_role) => {
    setIsLoggedIn(true);
    setRole(userId_role.role);
    setUserId(userId_role.id); 
  };

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <div id="all">
      <div className="App" >
        <BrowserRouter>
        {isLoggedIn ? <NavBar role = {role}/> : <></>}
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} setUserId = {setUserIdState}/>} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="apptList" element={<ApptList />} />
              <Route path="ticket_form" element={<TicketForm />} />
              <Route path="cancel_sunday_clinic" element={<CancelSundayClinic />} />
              <Route path="patient_form" element={<PatientForm />} />
              <Route path="list_of_patient" element={<ListOfPatient />} />
              <Route path="Clinic_Booking_page" element={<ClinicBookingPage />} />
              <Route path="emergence_appt" element={<EmergenceAppt />} />
              <Route path="cancel_appointment" element={<CancelAppointment />} />
              <Route path="sw_list" element={<SwList />} />
              <Route path="patient_sw" element={<PatientSw />} />
              <Route path="status_change" element={<StatusChange />} />
              <Route path="delete_user" element={<DeleteUser />} />
              <Route path="*" element={isLoggedIn ? <></> : <LogIn onLogin={handleLogin} setUserId = {setUserIdState}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;