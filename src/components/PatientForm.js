import React, { useState } from 'react';
import { setDoc, doc, collection, addDoc , getFirestore } from 'firebase/firestore';
import {app, auth, db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
import './PatientForm.css'

const PatientForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        idCard: "",
        gender: "",
        organization: "",
        socialWorker: "",
        phoneNumber: "",
        entryPermit: false,
        comments: "",
        verified: false,
        status: ""
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
    // Create a new document in the "patients" collection with the form data
    try {
        const patientsCollectionRef = collection(db, 'patients');
        await addDoc(patientsCollectionRef, formData);
      // Reset the form fields
      console.log('Patient submitted successfully!');
    } catch (error) {
      console.error('Error submitting patient:', error);
    }
  };

  return (
    <div>
      <h2>פתיחת כרטיס למטופל</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">:שם מלא</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="idCard">:מספר תז או דרכון</label>
          <input
            type="text"
            id="idCard"
            value={formData.idCard}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">מגדר</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">בחירת מגדר</option>
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
            <option value="other">אחר</option>
          </select>
        </div>
        <div>
          <label htmlFor="organization">:שם עמותה</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="socialWorker">:שם עובד סוציאלי</label>
          <input
            type="text"
            id="socialWorker"
            value={formData.socialWorker}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">:מספר פלאפון של העובד סוציאלי</label>
          <input
            type="text"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="entryPermit">?צריך אישור כניסה</label>
          <select
            id="entryPermit"
            name="entryPermit"
            value={formData.entryPermit}
            onChange={handleInputChange}
            required
            >
            <option value="no">לא</option>
            <option value="yes">כן</option>
            </select>
            </div>
        <div>
          <label htmlFor="comments">:הערות נוספות</label>
          <textarea
            id="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={2}
          />
        </div>
        <div>
          <label>
            <input
              id = "verify"
              type="checkbox"
              value={formData.verified}
            //   if checked

              onChange={handleInputChange}
              required
            />
            .אני מאשר שכל המידע שמסרתי מדוייק
          </label>
        </div>
        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default PatientForm;