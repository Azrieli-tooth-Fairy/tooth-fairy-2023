import React from 'react';
import { Link , useLocation } from 'react-router-dom';
import './NavBar.css'
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMusic } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
  const role = props.role;
  const location = useLocation();

  const homePageCards = [
    {
      icon: 'faCoffee',
      headline: 'יצירת משתמש חדש',
      link: '/sign_in',
    },
    {
      icon: 'faMusic',
      headline: 'תור למרפאה',
      link: '/Clinic_Booking_page',
    },
    // Add more cards as needed
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* Render cards only on the home page */}
        {location.pathname === '/' && (
          homePageCards.map((card, index) => (
            <li className="nav-item" key={index}>
              <Link to={card.link} className="nav-link">
                <Card icon={card.icon} headline={card.headline} /> {/* Use the Card component */}
              </Link>
            </li>
          ))
        )}

        {/* Render other navigation links */}
        <li className="nav-item">
          <Link to="/" className="nav-link">
            דף בית
          </Link>
        </li>
        {role === "job owner" ? 
        <li className="nav-item">
          <Link to="/sign_in" className="nav-link">
            רישום משתמש חדש
          </Link>
        </li> : ""} 
         
        {role === "job owner" || role === "social worker"?
        <li className="nav-item">
          <Link to="/Clinic_Booking_page" className="nav-link">
          קביעת תור למרפאות
          </Link>
        </li>: ""} 
        {role === "job owner" ?
        <li className="nav-item">
          <Link to="/emergence_appt" className="nav-link">
          קביעת תור למיון
          </Link>
        </li>: ""} 
        {/* {role === "job owner" ? */}
        {/* <li className="nav-item">
          <Link to="/ticket_form" className="nav-link">
            יצירת בקשה לטיפול
          </Link>
        </li> : ""} */}
        {role === "job owner" || role === "social worker"?
        <li className="nav-item">
          <Link to="/patient_form" className="nav-link">
            יצירת כרטיס למטופל
          </Link>
        </li>: ""} 
        {role === "job owner" || role === "student" || role === "doctor"?
        <li className="nav-item">
          <Link to="/apptList" className="nav-link">
            פרטי תורים
          </Link>
        </li>: ""} 
        {role === "job owner" || role === "student" || role === "doctor"?
        <li className="nav-item">
          <Link to="/list_of_patient" className="nav-link">
          רשימת המטופלים
          </Link>
        </li>: ""} 
        {role === "job owner" ? 
        <li className="nav-item">
          <Link to="/cancel_sunday_clinic" className="nav-link">
            ביטול מרפאת יום א
          </Link>
        </li> : ""}
        {role === "job owner" || role === "social worker"?
        <li className="nav-item">
          <Link to="/cancel_appointment" className="nav-link">
          ביטול תור
          </Link>
        </li>: ""} 
      </ul>
    </nav>
  );
}

export default Navbar;