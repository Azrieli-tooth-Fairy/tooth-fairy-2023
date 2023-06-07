  import React, { useState } from 'react';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js

  const ClinicBookingPage = () => {

    function handleSelection(event) {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
  
      // Ensure month and day have leading zeros if necessary
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
  
      return `${year}-${month}-${day}`;
    };
    
  const [formData, setFormData] = useState({
    idCard: "",
    date: getCurrentDate(),
    queue: "",
    clinic: "",
    reason: "",
    referralClinic: "",
    social_worker_name: "",
    social_worker_mail: "",
    social_worker_number: ""

  });
  
  

  const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    };

  const handleSubmit = async (e) => {
  e.preventDefault();
  // Create a new document in the "tickets" collection with the form data
  try {
      const ticketsCollectionRef = collection(db, 'appointments');
      await addDoc(ticketsCollectionRef, formData);
    // Reset the form fields
    console.log('Ticket submitted successfully!');
  } catch (error) {
    console.error('Error submitting ticket:', error);
  }
  };
    let content = null;
      content = (
        <div>
          <label htmlFor="idCard">:מספר תעודת זהות</label>
          <input type="number" id="idCard" required value={formData.idCard} onChange={handleInputChange}/>

          <label htmlFor="social_worker_name">:שם עובד סוציאלי</label>
          <input type="text" id="social_worker_name" required value={formData.social_worker_name} onChange={handleInputChange}/>

          <label htmlFor="social_worker_number">:מס' פלאפון של עובד סוציאלי</label>
          <input type="number" id="social_worker_number" required value={formData.social_worker_number} onChange={handleInputChange}/>

          <label htmlFor="social_worker_mail">:מייל של עובד סוציאלי</label>
          <input type="mail" id="social_worker_mail" required value={formData.social_worker_mail} onChange={handleInputChange}/>

          <label htmlFor="date">:תאריך</label>
          <input type="date" id="date" required value={formData.date} onChange={handleInputChange} min={getCurrentDate()}/>

          <label htmlFor="queue">:שעה</label>
          <input type="time" id="queue" required value={formData.queue} onChange={handleInputChange}/>

          <h4>:סיבת הפנייה</h4>
          <textarea name='reason' value={formData.reason} id = "referral_reason" onChange={(e) => handleSelection(e)} required/>

      {/*dosn't work!!  */}
          <h4>:מרפאה מפנה</h4>
          {/* <label>
            <input
              type="radio"
              name="referralClinic"
              value="sundayClinic"
              checked={referralClinic === 'sundayClinic'}
              onChange={(e) =>handleSelection(e)}
              id = "referral_clinic"
              required
            />
            מרפאת יום א
          </label>
          <label>
            <input
              type="radio"
              name="referralClinic"
              value="firstAidClinic"
              checked={referralClinic === 'firstAidClinic'}
              onChange={(e) =>handleSelection(e)}
              id = "referral_clinic"
              required
            />
            מרפאת עזרה ראשונה
          </label>
          <label>
            <input
              type="radio"
              name="referralClinic"
              value="other"
              checked={referralClinic === 'other'}
              onChange={(e) =>handleSelection(e)}
              id = "referral_clinic"
              required
            />
            :אחר
            <input type="text" value={referralClinic} onChange={(e) =>handleSelection(e)} required/>
          </label> */}
        </div>
      );

    return (
      <div>
        <h2>קביעת תור למרפאת מיון</h2>
        <h1>{formData.clinic}</h1>
        {content}
          <button type="submit" onClick={handleSubmit}>
          לקביעת תור
          </button> 
      </div>
    );
  };

  export default ClinicBookingPage;
