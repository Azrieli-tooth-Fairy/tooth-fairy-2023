import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const CancelSundayClinic = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [cancelDates, setCancelDates] = useState([]);

  useEffect(() => {
    const fetchCancelDates = async () => {
      try {
        const cancelClinicCollectionRef = collection(db, 'cancelSundayClinic2');
        const cancelDatesSnapshot = await getDocs(cancelClinicCollectionRef);
        const cancelDatesData = cancelDatesSnapshot.docs.map((doc) => doc.data().date);
        setCancelDates(cancelDatesData);
      } catch (error) {
        console.log('Error fetching cancel clinic dates:', error);
      }
    };

    fetchCancelDates();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cancelSundayClinicRef = collection(db, 'cancelSundayClinic2');
      await addDoc(cancelSundayClinicRef, { date: selectedDate });
      console.log('Date submitted successfully!');
      alert('Date submitted successfully!');
    } catch (error) {
      console.error('Error submitting date:', error);
    }
  };

  // Helper function to generate the next 6 Sundays
  const renderNextSixSundays = () => {
    const today = new Date();
    const nextSixSundays = [];

    for (let i = 0; nextSixSundays.length < 6; i++) {
      const sunday = new Date(today.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      if (sunday.getDay() === 0) {
        nextSixSundays.push(formatDate(sunday));
      }
    }

    return nextSixSundays;
  };

  // Helper function to format the date as "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // return (
  //   <div>
  //     <h2>ביטול מרפאת יום ראשון</h2>
  //     <form onSubmit={handleSubmit}>
  //       <select id="date" value={selectedDate} onChange={handleDateChange} required>
  //         <option value="">בחר יום ראשון</option>
  //         {/* Render options for the next 6 Sundays */}
  //         {renderNextSixSundays().map((sunday) => (
  //           <option key={sunday} value={sunday} disabled={cancelDates.includes(sunday)}>
  //             {sunday}
  //           </option>
  //         ))}
  //       </select>
  //       {/* <label htmlFor="date">בחר יום ראשון </label> */}
  //       <br/>
  //       <button type="submit"  style={{ textAlign: 'right' }} >     שלח</button>
  //     </form>
  //   </div>
  // );
  return (
    <div>
      <h2>ביטול מרפאת יום ראשון</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <select id="date" value={selectedDate} onChange={handleDateChange} required className="form-select mb-3">
          <option value="">בחר יום ראשון</option>
          {/* Render options for the next 6 Sundays */}
          {renderNextSixSundays().map((sunday) => (
            <option key={sunday} value={sunday} disabled={cancelDates.includes(sunday)}>
              {sunday}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>
  );
  
};

export default CancelSundayClinic;
