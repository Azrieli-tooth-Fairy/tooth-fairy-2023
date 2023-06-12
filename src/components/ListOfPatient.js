import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
        const patientList = querySnapshot.docs.map((doc) =>{let data = doc.data(); data.docId = doc.id; return data});
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
          (patient) => patient.id && patient.id.toLowerCase().indexOf(searchId.toLowerCase()) !== -1
        );
        setFilteredPatients(filtered);
      }
    };
  
    filterPatients();
  }, [searchId, patients]);
  

  const deleteUser = async (id) => {
    try {
      const docRef = doc(db, 'tickets', id);
      await deleteDoc(docRef);
      console.log('User deleted successfully');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };
  
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
      <h2>רשימת מטופלים</h2>
      {filteredPatients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>תעודת זהות</th>
              <th>שם מלא</th>
              <th>שם עובד סוציאלי</th>
              <th>מייל עובד סוציאלי</th>
              <th>ם עמותה</th>
              <th>סטאטוס</th>
              <th>פעולה</th> {/* Add a column for actions */}
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
            <td>
              <button className="delete-button" onClick={() => deleteUser(patient.docId)}>מחק</button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      ) : (
        <p>לא נמצאו מטופלים</p>
      )}
    </div>
  );
};

export default PatientList;
