import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './ApptList.css';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the appointment data from Firestore collection
    const fetchAppointments = async () => {
      try {
        const appointmentsColRef = collection(db, 'appointments');
        const querySnapshot = await getDocs(appointmentsColRef);
        const appointmentsData = querySnapshot.docs.map((doc) => doc.data());
        setAppointments(appointmentsData);
      } catch (error) {
        console.log('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to check if a date is in the future
  const isFutureDate = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate > today;
  };

  return (
    <div>
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Clinic</th>
            <th>Queue</th>
            <th>Reason</th>
            <th>Referral Clinic</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => {
            if (isFutureDate(appointment.date)) {
              return (
                <tr key={index}>
                  <td>{appointment.idCard}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.clinic}</td>
                  <td>{appointment.queue}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.referralClinic}</td>
                  <td>{appointment.status}</td>
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
};

export default AppointmentsTable;
