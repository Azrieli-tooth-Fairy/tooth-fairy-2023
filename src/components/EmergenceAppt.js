  import React, { useState } from 'react';
  import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
  import { db , fetchDocumentByFieldValue } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
  import emailjs from 'emailjs-com';
  import './EmergenceAppt.css'

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
  
      return `${day}-${month}-${year}`;
    };
    
  const [formData, setFormData] = useState({
    idCard: "",
    fullName: "",
    date: getCurrentDate(),
    queue: "",
    clinic: "emergency",
    reason: "",
    // referralClinic: "",
    referral_clinic: "",
    social_worker_name: "",
    social_worker_mail: "",
    social_worker_number: ""

  });
  
  const sendMailEmergency = (e) => {
    e.preventDefault();

    const serviceID = "toothFariyAdmin";
    const templateID = "template_jhtva3r";
    // const templateID = "template_jhtva3r"; // for test
    var params = {
        idCard: formData.idCard,
        fullName: formData.fullName,
        social_worker_name: formData.social_worker_name,
        social_worker_mail: formData.social_worker_mail,
        date: formData.date,
        queue: formData.queue
      };

    emailjs
        .send(serviceID, templateID, params,"IY_q-mRXPfxKZKMHs") // need to hide this key!
        .then((res)=> {
            alert("הודעתך נשלחה בהצלחה");
        })
  }

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
      const ticket = await fetchDocumentByFieldValue("tickets", "idCard", formData.idCard);
      await updateDoc(doc(db, 'tickets', ticket.docId), {"status": formData.clinic});
      // Reset the form fields
      
      if (formData.idCard && formData.idCard.length !== 9) {
        alert("מספר תעודת הזהות צריך להיות בדיוק 9 ספרות");
        return;
      }
      if (formData.social_worker_number && formData.social_worker_number.length !== 10){
        if (formData.social_worker_number[0] !== "0" || formData.social_worker_number[1] !== "5"){
          alert("מספר הפלאפון צריך להיות זמין.\n לדוגמא (054-123-1324)");
          return;
        }
        alert("מספר הפלאפון צריך להיות 10 ספרות");
        return;
      }
      console.log('Ticket submitted successfully!');
      sendMailEmergency(e);
  } catch (error) {
    console.error('Error submitting ticket:', error);
    alert('Error submitting ticket: check your details and submit again', error)
  }
  };
    let content = null;
      content = (
        <div>
          <label htmlFor="idCard">:מספר תעודת זהות</label>
          <input type="number" id="idCard" required value={formData.idCard} onChange={handleInputChange}/>

          <label htmlFor="fullName">:שם מלא</label>
          <input type="text" id="fullName" required value={formData.fullName} onChange={handleInputChange} style={{direction: 'rtl'}}/>

          <label htmlFor="social_worker_name">:שם עובד סוציאלי</label>
          <input type="text" id="social_worker_name" required  style={{ width: '150px', textAlign: 'right' }} value={formData.social_worker_name} onChange={handleInputChange}/>

          <label htmlFor="social_worker_number">:מס' פלאפון של עובד סוציאלי</label>
          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="social_worker_number" required value={formData.social_worker_number} onChange={handleInputChange}/>

          <label htmlFor="social_worker_mail">:מייל של עובד סוציאלי</label>
          <input type="mail" id="social_worker_mail" required value={formData.social_worker_mail} onChange={handleInputChange}/>

          <label htmlFor="date">:תאריך</label>
          <input type="date" id="date" required value={formData.date} onChange={handleInputChange} min={getCurrentDate()}/>

          <label htmlFor="queue">:שעה</label>
          <input type="time" id="queue" required value={formData.queue} onChange={handleInputChange}/>

          <label htmlFor='reason'>:סיבת הפנייה</label>
          <textarea type="text" name='reason' value={formData.reason} id = "referral_reason" onChange={(e) => handleSelection(e)}  style={{direction: 'rtl'}} required/>

          <label htmlFor='referral_clinic'>:מרפאה מפנה</label>
          <input type="text" name = 'referral_clinic' value={formData.referral_clinic} id='referral_clinic' onChange={(e) =>handleSelection(e)}  style={{direction: 'rtl'}} required/>
        </div>
      );

    return (
      <div>
        <h1>קביעת תור למרפאת מיון</h1>
        {content}
          <button type="submit" onClick={handleSubmit}>
          לקביעת תור
          </button> 
      </div>
    );
  };

  export default ClinicBookingPage;
