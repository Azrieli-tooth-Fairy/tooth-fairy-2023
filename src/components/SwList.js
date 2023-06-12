//List of social workers by orgnizations 
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have initialized the Firebase app and obtained the Firestore instance in a separate file.

const SwList = () => {
  const [socialWorkers, setSocialWorkers] = useState([]);

  useEffect(() => {
    const fetchSocialWorkers = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'social_worker'));
      const querySnapshot = await getDocs(q);
      const fetchedSocialWorkers = [];

      querySnapshot.forEach((doc) => {
        const socialWorkerData = doc.data();

        const socialWorker = {
          full_name: socialWorkerData.full_name,
          phone_number: socialWorkerData.phone_number,
          organization_Name: socialWorkerData.organization_Name,
        };
        fetchedSocialWorkers.push(socialWorker);
      });
      console.log(fetchedSocialWorkers);
      setSocialWorkers(fetchedSocialWorkers);
    };

    fetchSocialWorkers();
  }, []);

  return (
    <div>
      <h2>Social Workers</h2>
      <table>
        <thead>
          <tr>
            <th>שם מלא</th>
            <th>מספר פלאפון</th>
            <th>שם עמותה</th>
          </tr>
        </thead>
        <tbody>
          {socialWorkers.map((socialWorker, index) => (
            <tr key={index}>
              <td>{socialWorker.full_name}</td>
              <td>{socialWorker.phone_number}</td>
              <td>{socialWorker.organization_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SwList;
