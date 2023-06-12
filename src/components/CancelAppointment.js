import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Import the Firestore instance from firebase.js
import './CancelAppointment.css'; // Import the CSS file for styling

const CancelAppointment = () => {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (patientId) {
      const getAppointments = async () => {
        try {
          const q = query(collection(db, 'appointments'), where('idCard', '==', patientId));
          const querySnapshot = await getDocs(q);
          const appointmentsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(appointmentsData);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      getAppointments();
    }
  }, [patientId]);
  

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      console.log('Appointment canceled successfully!');
      alert('Appointment canceled successfully!');

      // Remove the canceled appointment from the list
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Trigger fetching appointments for the entered patient ID
    setPatientId(event.target.elements.patientId.value);
  };

  return (
    <div>
      <h2>Cancel Appointment</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="patientId">תז מטופל</label>
        <input type="text" id="patientId" name="patientId" required />
        <button type="submit">הצג פגישות</button>
      </form>
       {/* {patientId && appointments.length === 0 && (
        alert("There is no appointments for this ID. \nMake sure the ID is true.")
       )} */}
      {appointments.length > 0 && (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>שעה</th>
              <th>שם מרפאה</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.queue}</td>
                <td>{appointment.clinic}</td>
                <td>
                  <button onClick={() => handleCancelAppointment(appointment.id)}>ביטול פגישה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CancelAppointment;
