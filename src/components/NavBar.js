import React from 'react';
import { Link , useLocation } from 'react-router-dom';
import './NavBar.css'
// import Card from './Card';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Card , CardGroup} from 'react-bootstrap'

function Navbar(props) {
  const role = props.role;
  const location = useLocation();

  const NavigationGrid = () => {
    return (
      <CardGroup className='navgrid-container'>
        {location.pathname === '/' && (
          cards.map((card, index) => (//need to add the location
            card.roles.find(r => r === {role}) !== -1 ? (
              <div>
                <Card key={index}>
                  <Card.Img variant="top" src={card.icon} />
                  <Card.Body>
                    <Card.Title className='navgrid-header'>{card.headline}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={card.link} className="nav-link"></Link>        
                  </Card.Footer>
                </Card>
              </div>
            ) : null
          ))
        )}
      </CardGroup>
    );
  };
  


  const cards = [
    {
      icon: faCoffee,
      headline: 'יצירת משתמש חדש',
      link: '/sign_in',
      roles: ["job_owner"]
    },
    {
      icon: faMusic,
      headline: 'תור למרפאה',
      link: '/Clinic_Booking_page',
      roles: ["job_owner"]
    },
    //{
    //   icon: faCoffee,
    //   headline: 'פתיחת כרטיס למטופל',
    //   link: '/ticket_form',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faMusic,
    //   headline: 'תור למרפאה',
    //   link: '/Clinic_Booking_page',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faCoffee,
    //   headline: 'יצירת משתמש חדש',
    //   link: '/sign_in',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faMusic,
    //   headline: 'תור למרפאה',
    //   link: '/Clinic_Booking_page',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faCoffee,
    //   headline: 'פתיחת כרטיס למטופל',
    //   link: '/ticket_form',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faMusic,
    //   headline: 'תור למרפאה',
    //   link: '/Clinic_Booking_page',
    //   roles: ["job owner"]
    // },
    // {
    //   icon: faCoffee,
    //   headline: 'יצירת משתמש חדש',
    //   link: '/sign_in',
    //   roles: ["job owner"]
    // },
  ];

  return (
  <div>  
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* Render cards only on the home page */}

        {/* Render other navigation links */}
        <li className="nav-item">
          <Link to="/" className="nav-link">
            דף בית
          </Link>
        </li>
        {role === "job_owner" ? 
        <li className="nav-item">
          <Link to="/sign_in" className="nav-link">
            רישום משתמש חדש
          </Link>
        </li> : ""} 
         
        {role === "job_owner" || role === "social_worker"?
        <li className="nav-item">
          <Link to="/Clinic_Booking_page" className="nav-link">
          קביעת תור למרפאות
          </Link>
        </li>: ""} 
        {role === "job_owner" ?
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
        {role === "job_owner" || role === "social_worker"?
        <li className="nav-item">
          <Link to="/patient_form" className="nav-link">
            יצירת כרטיס למטופל
          </Link>
        </li>: ""} 
        {role === "job_owner" || role === "student" || role === "doctor"?
        <li className="nav-item">
          <Link to="/apptList" className="nav-link">
            פרטי תורים
          </Link>
        </li>: ""} 
        {role === "job_owner" || role === "student" || role === "doctor"?
        <li className="nav-item">
          <Link to="/list_of_patient" className="nav-link">
          רשימת המטופלים
          </Link>
        </li>: ""} 
        {role === "job_owner" ?
        <li className="nav-item">
          <Link to="/sw_list" className="nav-link">
          רשימת עמותות
          </Link>
        </li>: ""} 
        {role === "job_owner" ? 
        <li className="nav-item">
          <Link to="/delete_user" className="nav-link">
            מחיקת משתמש
          </Link>
        </li> : ""}
        {role === "job_owner" ? 
        <li className="nav-item">
          <Link to="/cancel_sunday_clinic" className="nav-link">
            ביטול מרפאת יום א
          </Link>
        </li> : ""}
        {role === "job_owner" || role === "social_worker"?
        <li className="nav-item">
          <Link to="/cancel_appointment" className="nav-link">
          ביטול תור
          </Link>
        </li>: ""} 
      </ul>
    </nav>
    <NavigationGrid/>
  </div>
    

  );
}

export default Navbar;