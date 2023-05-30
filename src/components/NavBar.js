import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {/* Home */}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sign_in" className="nav-link">
            רישום משתמש חדש
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Clinic_Booking_page" className="nav-link">
          קביעת תור למרפאות
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/emergence_appt" className="nav-link">
          קביעת תור למיון
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ticket_form" className="nav-link">
            יצירת כרטיס למטופל
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/apptList" className="nav-link">
            פרטי תורים
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/list_of_patient" className="nav-link">
          רשימת המטופלים
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cancel_appointment" className="nav-link">
          ביטול תור
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;