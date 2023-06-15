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
      <h1>חיפוש מטופלים</h1>
      <p></p>
      <div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter patient ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {ticketData && searchId !== "" ? (
        <div className="ticket-data">
          <h3>פרטי מטופלים</h3>
          <table>
            <tbody>
              <tr>
                <td>{ticketData.idCard}</td>
                <td>תעודת זהות</td>
              </tr>
              <tr>
                  <td>{ticketData.fullName}</td>
                <td>שם מלא</td>
              </tr>
              <tr>
                <td>{ticketData.nickName}</td>
                <td>כינוי</td>
              </tr>
              <tr>
                <td>{ticketData.phoneNumber}</td>
                <td>מספר פלאפון</td>
              </tr>
              <tr>
                <td>{ticketData.gender}</td>
                <td>מגדר</td>
              </tr>
              <tr>
                <td>{ticketData.organization}</td>
                <td>שם העמותה</td>
              </tr>
              <tr>
                <td>{ticketData.status}</td>
                <td>סטאטוס</td>
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
