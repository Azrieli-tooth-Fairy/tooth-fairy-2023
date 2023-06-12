import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { Card, CardGroup } from 'react-bootstrap';
// import "./Card.js"

function Navbar(props) {
  const role = props.role;
  const location = useLocation();

  const NavigationGrid = () => {
    return (
      <div className='cardsdisplay'>
        {location.pathname === '/' && (
          <CardGroup className='navgrid-container'>
            {console.log(cards)}
            {cards.map((card, index) => (
              card.roles.includes(role) ? (
                <div className='cards-place' key={index}>
                  {/* <Card> */}
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={card.icon} />
                    <Card.Footer>
                      <Link to={card.link} className="nav-link">{card.headline}</Link>        
                    </Card.Footer>
                  </Card>
                </div>
              ) : null
            ))}
          </CardGroup>
        )}
      </div>
    );
  };


  const cards = [
    {
      // icon: require('./LOGIN-IMG.png'),
      icon: require('../Img-src/open-ticket.png'),
      headline: 'פתיחת כרטיס למטופל',
      link: '/patient_form',
      roles: ["job_owner"]
    },
    {
      // icon: require('./LOGIN-IMG.png') ,
      icon: require('../Img-src/clinic-book.jpg'),
      headline: 'תור למרפאה',
      link: '/Clinic_Booking_page',
      roles: ["job_owner"]
    },
    {
      icon: require('./LOGIN-IMG.png') ,
      headline: 'קביעת תור למיון',
      link: '/emergence_appt',
      roles: ["job owner"]
    },
    {
      icon:require('./LOGIN-IMG.png') ,
      headline: 'פרטי תורים',
      link: '/appt_list',
      roles: ["job owner"]
    },
    {
      icon: require('./LOGIN-IMG.png'),
      headline: 'רשימת מטופלים',
      link: '/list_of_patient',
      roles: ["job owner", "student", "doctor"]
    },
    {
      icon: require('./LOGIN-IMG.png'),
      headline: 'שינוי סאטאטוס',
      link: '/status_change',
      roles: ["job owner", "student", "doctor"]
    },
    {
      icon: require('./LOGIN-IMG.png'),
      headline: 'ביטול תור',
      link: '/cancel_appointment',
      roles: ["job owner", "social worker"]
    },
    {
      icon: require('./LOGIN-IMG.png'),
      headline: 'מחיקת משתמש',
      link: '/delete_user',
      roles: ["job owner"]
    }
  ];

  return (
  <div className='lior'>  
    <nav className="navbar-top">
      <div className="navbar-nav2">
        {/* Render other navigation links */}
        {/* <div className='navbar-link'></div> */}
        <div className="nav-item">
          <Link to="/" className="nav-link">
            דף בית
          </Link>   
        </div>

        {role === "job_owner" ? 
        <div className="nav-item">
          <Link to="/sign_in" className="nav-link">
            רישום משתמש חדש
          </Link>
        </div> : ""} 
         
        {role === "job_owner" || role === "social_worker"?
        <div className="nav-item">
          <Link to="/Clinic_Booking_page" className="nav-link">
          קביעת תור למרפאות
          </Link>
        </div>: ""} 
        {role === "job_owner" ?
        <div className="nav-item">
          <Link to="/emergence_appt" className="nav-link">
          קביעת תור למיון
          </Link>
        </div>: ""} 
        {role === "job_owner" || role === "social_worker"?
        <div className="nav-item">
          <Link to="/patient_form" className="nav-link">
            יצירת כרטיס למטופל
          </Link>
        </div>: ""} 
        {role === "job_owner" || role === "student" || role === "doctor"?
        <div className="nav-item">
          <Link to="/apptList" className="nav-link">
            פרטי תורים
          </Link>
        </div>: ""}
        {role === "job_owner" || role === "student" || role === "doctor"?
        <div className="nav-item">
          <Link to="/status_change" className="nav-link">
         שינוי סטאטוס   
          </Link>
        </div>: ""}  
        {role === "job_owner" || role === "student" || role === "doctor"?
        <div className="nav-item">
          <Link to="/list_of_patient" className="nav-link">
          רשימת המטופלים
          </Link>
        </div>: ""} 
        {role === "job_owner" ?
        <div className="nav-item">
          <Link to="/sw_list" className="nav-link">
          רשימת עמותות
          </Link>
        </div>: ""} 
        {role === "job_owner" ? 
        <div className="nav-item">
          <Link to="/delete_user" className="nav-link">
            מחיקת משתמש
          </Link>
        </div> : ""}
        {role === "job_owner" ? 
        <div className="nav-item">
          <Link to="/cancel_sunday_clinic" className="nav-link">
            ביטול מרפאת יום א
          </Link>
        </div> : ""}
        {role === "social_worker" ? 
        <div className="nav-item">
          <Link to="/patient_sw" className="nav-link">
            חיפוש מטופל ע"פ תז
          </Link>
        </div> : ""}
        {role === "job_owner" || role === "social_worker"?
        <div className="nav-item">
          <Link to="/cancel_appointment" className="nav-link">
          ביטול תור
          </Link>
        </div>: ""} 
      </div>
    </nav>
    <NavigationGrid/>
  </div>
  );
}

export default Navbar;