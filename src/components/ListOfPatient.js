import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './ListOfPatient.css'
const PatientList = () => {
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'tickets'));
          const patientList = querySnapshot.docs.map((doc) => doc.data());
          setPatients(patientList);
        } catch (error) {
          console.log('Error fetching patients:', error);
        }
      };
  
      fetchPatients();
    }, []);
  
    return (
      <div className="PatientList">
        <h2>Patient List</h2>
        {patients.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Card</th>
                <th>Full Name</th>
                <th>Social Worker Name</th>
                <th>Social Worker Number</th>
                <th>Organization Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.idCard}</td>
                  <td>{patient.fullName}</td>
                  <td>{patient.socialWorker}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>{patient.organization}</td>
                  <td>{patient.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    );
  };
  export default PatientList;