import React, { useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './StatusChange.css';

const StatusChange = () => {
  const [searchId, setSearchId] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [status, setStatus] = useState('');

  const handleSearch = async () => {
    const q = query(collection(db, 'tickets'), where('idCard', '==', searchId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const ticket = querySnapshot.docs[0].data();
      ticket.docId =querySnapshot.docs[0].id ;
      setTicketData(ticket);
      setStatus(ticket.status); // Set the initial status value
    } else {
      setTicketData(null);
      setStatus(''); // Reset the status value
    }
  };

  const handleStatusChange = async () => {
    if (ticketData && ticketData.idCard) {
      // console.log(ticketData + "\n" + ticketData.idCard)
      try {
        const ticketRef = doc(db, 'tickets', ticketData.docId);
        await updateDoc(ticketRef, { "status":status });
        setTicketData({ ...ticketData, "status":status });
        alert('Status changed successfully');
      } catch (error) {
        console.log('Error updating status:', error);
        alert('An error occurred while updating the status. Please try again later.');
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  }

  return (
    <div>
      <h2>שינוי סטאטוס</h2>
      <div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter patient ID"
        />
        <button onClick={handleSearch}>חפש</button>
      </div>
      {ticketData && (
        <div className="ticket-data">
          <h3>שינוי סטאטוס מטופל</h3>
          <p>{ticketData.status} - סטאטוס נוכחי </p> 
          <div>
            <label htmlFor="status">סטאטוס</label>
            <select id="status" value={status} onChange={handleChange}>
              <option value="">בחר סטאטוס</option>
              <option value="general">כללי</option>
              <option value="emergency_wait">ממתין למיון</option>
              <option value="emergency">מיון</option>
              <option value="sunday_clinic">מרפאת יום א</option>
              <option value="intern_care">מטופל אצל מתמחה</option>
              <option value="student_care">מטופל אצל סטונדט</option>
            </select>
            <button onClick={handleStatusChange}>שינוי סטאטוס</button> 
          </div>
        </div>
      )}
      
      {!ticketData && searchId && <p>לא נמצאו מטופלים. אנא בדוק את מספר תעודת הזהות ונסה שנית</p>}
    </div>
  );
};

export default StatusChange;
