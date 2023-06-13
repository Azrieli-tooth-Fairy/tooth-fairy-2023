import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Replace with your Firebase configuration
import './PatientSw.css'
const PatientSw = () => {
  const [searchId, setSearchId] = useState('');
  const [ticketData, setTicketData] = useState(null);

  const handleSearch = async () => {
    const q = query(collection(db, 'tickets'), where('idCard', '==', searchId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const ticket = querySnapshot.docs[0].data();
      setTicketData(ticket);
    } else {
      setTicketData(null);
    }
  };

  return (
    <div>
      <h2>חיפוש מטופלים</h2>
      <div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter patient ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {ticketData ? (
        <div className="ticket-data">
          <h3>פרטי מטופלים</h3>
          <table>
            <tbody>
              <tr>
                <td>סטאטוס</td>
                <td>{ticketData.status}</td>
              </tr>
              <tr>
                <td>שם העמותה</td>
                <td>{ticketData.organization}</td>
              </tr>
              <tr>
                <td>מספר פלאפון</td>
                <td>{ticketData.phoneNumber}</td>
              </tr>
              <tr>
                <td>מגדר</td>
                <td>{ticketData.gender}</td>
              </tr>
              <tr>
                <td>כינוי</td>
                <td>{ticketData.nickName}</td>
              </tr>
              <tr>
                <td>שם מלא</td>
                <td>{ticketData.fullName}</td>
              </tr>
              <tr>
                <td>תעודת זהות</td>
                <td>{ticketData.idCard}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>לא נמצאו מטופלים. אנא בדוק את מספר תעודת הזהות</p>
      )}
    </div>
  );
};

export default PatientSw;
