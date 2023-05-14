import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sign_in" className="nav-link">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Cinic_Booking_page" className="nav-link">
            Clinic Booking Page
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/apptDetails" className="nav-link">
            Appointment Details
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ticket_form" className="nav-link">
            Ticket Form
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;