import './App.css';

import Header from './components/Header'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import SignIn from './components/SignIn'
import LogOut from './components/LogOut'
import Footer from './components/Footer'
import ApptList from './components/ApptList'
import ApptDetails from './components/ApptDetails'
import TicketForm from './components/TicketForm'
import ClinicBookingPage from './components/ClinicBookingPage'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";


function App() {
  return (
    <div id = "all">
      <div className="App">
      {/* <Header/> */}
      {/* <NavBar/> */}
      {/* <LogIn auth = {auth}/> */}
      {/* <SignIn/> */}
      {/* <Footer/> */}
      <BrowserRouter>
        <Routes>

            <Route path="/" element={<div><NavBar/><Outlet/></div>}>
              <Route index element={<LogIn />} />
              <Route path="sign_in" element={<SignIn/>} />
              {/* <Route path="apptList" element={<ApptList />} /> */}
              <Route path="navbar" element={<NavBar />} />
              <Route path="apptDetails" element={<ApptDetails/>} />
              <Route path="ticket_form" element={<TicketForm/>} />
              <Route path="Cinic_Booking_page" element={<ClinicBookingPage/>} />
              <Route path="*" element={<LogIn/>} />
            </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}
//create context \ global values
export default App;
