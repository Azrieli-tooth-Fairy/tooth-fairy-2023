// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const ApptList = () => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     // Fetch scheduled appointments from Firebase Firestore
//     const fetchAppointments = async () => {
//       const firestore = firebase.firestore();

//       try {
//         const appointmentsCollection = firestore.collection('appointments');
//         const snapshot = await appointmentsCollection.get();

//         const appointmentsData = snapshot.docs.map((doc) => {
//           const { clientName, clientId, clinicType, appointmentTime, appointmentDate } = doc.data();
//           return {
//             id: doc.id,
//             clientName,
//             clientId,
//             clinicType,
//             appointmentTime,
//             appointmentDate,
//           };
//         });

//         setAppointments(appointmentsData);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   return (
//     <div>
//       <h2>Scheduled Appointments</h2>
//       {appointments.length === 0 ? (
//         <p>No appointments scheduled.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Client Name</th>
//               <th>Client ID</th>
//               <th>Clinic Type</th>
//               <th>Appointment Time</th>
//               <th>Appointment Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <tr key={appointment.id}>
//                 <td>{appointment.clientName}</td>
//                 <td>{appointment.clientId}</td>
//                 <td>{appointment.clinicType}</td>
//                 <td>{appointment.appointmentTime}</td>
//                 <td>{appointment.appointmentDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ApptList;
