import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import './ListOfPatient.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

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

  useEffect(() => {
    const filterPatients = () => {
      if (searchId.trim() === '') {
        setFilteredPatients(patients);
      } else {
        const filtered = patients.filter(
          (patient) => patient.idCard.toLowerCase().indexOf(searchId.toLowerCase()) !== -1
        );
        setFilteredPatients(filtered);
      }
    };

    filterPatients();
  }, [searchId, patients]);

  return (
    <div className="PatientList">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {/* Add a search icon here */}
      </div>
      <h2>Patient List</h2>
      {filteredPatients.length > 0 ? (
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
            {filteredPatients.map((patient, index) => (
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
