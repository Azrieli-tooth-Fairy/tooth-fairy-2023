import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './ApptList.css';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [ticketData, setTicketData] = useState(null);
  const [status, setStatus] = useState('');

  

  useEffect(() => {
    // Fetch the appointment data from Firestore collection
    const fetchAppointments = async () => {
      try {
        const appointmentsColRef = collection(db, 'appointments');
        const querySnapshot = await getDocs(appointmentsColRef);
        const appointmentsData = querySnapshot.docs.map((doc) =>{let data = doc.data(); data.docId = doc.id; return data});
        setAppointments(appointmentsData);
      } catch (error) {
        console.log('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
  

  // Function to check if a date is in the future // need to Check if its good
  // const isFutureDate = (dateString) => {
  //   const today = new Date();
  //   const appointmentDate = new Date(dateString);
  //   return appointmentDate >= today;
  // };
  const isFutureDate = (dateString) => {
    if (!dateString) {
      return false; // Return false if the dateString is undefined or null
    }
    const today = new Date();
    const [day, month, year] = dateString.split('-');
    const appointmentDate = new Date(`${year}-${month}-${day}`);
    return appointmentDate >= today;
  };
  
  

  return (
    <div>
      <h1>פרטי תורים</h1>
      <p></p>
      <table>
        <thead>
          <tr>
            <th>סיבת הפנייה</th>
            <th>מרפאה מפנה</th>
            <th>מרפאה</th>
            <th>שעה</th>
            <th>תאריך</th>
            <th>שם מלא</th>
            <th>תז</th>

          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => {
            if (isFutureDate(appointment.date)) {
              return (
                <tr key={index}>
                  <td>{appointment.reason}</td>
                  <td>{appointment.referral_clinic}</td>
                  <td>{appointment.clinic}</td>
                  <td>{appointment.queue}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.fullName}</td>
                  <td>{appointment.idCard}</td>
                </tr>
              );
            } else {
              return null; // Skip displaying the appointment if the date has passed
            }
          })}
        </tbody>
      </table>
    </div>
  );

  // return (
  //   <div>
  //     <h1>פרטי תורים</h1>
  //     <p></p>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>סיבת הפנייה</th>
  //           <th>מרפאה מפנה</th>
  //           <th>מרפאה</th>
  //           <th>שעה</th>
  //           <th>תאריך</th>
  //           <th>תז</th>

  //         </tr>
  //       </thead>
  //       <tbody>
  //         {appointments.map((appointment, index) => {
            
  //             return (
  //               <tr key={index}>
  //                 <td>{appointment.reason}</td>
  //                 <td>{appointment.referral_clinic}</td>
  //                 <td>{appointment.clinic}</td>
  //                 <td>{appointment.queue}</td>
  //                 <td>{appointment.date}</td>
  //                 <td>{appointment.idCard}</td>
  //               </tr>
  //             );
            
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default AppointmentsTable;
