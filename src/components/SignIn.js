import React, { useState } from "react";
import "./SignIn.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
// import app from '../firebase'; // Import the Firebase configuration
// const db = getFirestore(app);
// const auth = getAuth();

function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("");

  const [formData, setFormData] = useState({    
    full_name: "",
    phone_number: "",
    mail: "",
    password: "",
    school_year: "",
    job_in_fairy: "",
    isAdmin: "", 
    organization_Name: ""
  });

const handleInputChange = (event) => {
  const { id, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: value,
  }));
};

const handleSubmit = async (e) => {
  //e.preventDefault();
  // Create a new document in the "users" collection with this data 
  try {
      const usersCollectionRef = collection(db, "users");
      await addDoc(usersCollectionRef, formData);
    // Reset the form fields
    console.log('user submitted successfully!');
  } catch (error) {
    console.error('Error submitting user:', error);
  }
};
  //=========================makeing some changes

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target; // Get the form element
    const userEmail = form.elements.mail.value; // Get the value of the "mail" input
    const userPassword = form.elements.password.value; // Get the value of the "password" input

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        handleSubmit();
        console.log('signIn successful');
        form.reset();
      })
      .catch((error) => {
        console.log('Login error', error);
      });
  };

  return (
    <div>
      <h1>טופס רישום</h1>
      <label htmlFor="role">:תפקיד</label>
      <select id="role" name="role" value={selectedRole} onChange={handleRoleChange}>
        <option value="">בחר תפקיד</option>
        <option value="job_owner">בעל תפקידים</option>
        <option value="student">סטודנט</option>
        <option value="doctor">רופא</option>
        <option value="social_worker">עובד סוציאלי</option>
      </select>

      {selectedRole === "job_owner" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for job owners */}
    <label htmlFor="full_name">שם מלא:</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">:מספר פלאפון</label>
    <input type="number" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange}required/><br />

    <label htmlFor="mail">:כתובת מייל</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">:סיסמא</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="school_year">:שנת לימודים</label>
    <input type="text" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required/><br />

    <label htmlFor="job_in_fairy">:תפקיד בפייה</label>
    <input type="text" id="job_in_fairy" name="job_in_fairy" value={formData.job_in_fairy} onChange={handleInputChange} required/><br />

    <label htmlFor="isAdmin">Is admin?</label>
    <input type="checkbox" id="isAdmin" name="isAdmin" value={formData.isAdmin} onChange={handleInputChange} required/><br />

    <button type="submit">שלח</button>
  </form>
)}


{selectedRole === "student" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for students */}
    <label htmlFor="full_name">:שם מלא</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">:מספר פלאפון</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail">:כתובת מייל</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">:סיסמא</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="school_year">:שנת לימודים</label>
    <input type="text" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required/><br />

    <button type="submit">שלח</button>
  </form>
)}


{selectedRole === "doctor" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for doctors */}
    <label htmlFor="full_name">:שם מלא</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">:מספר פלאפון</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail_address">:כתובת מייל</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">:סיסמא</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <button type="submit">שלח</button>
  </form>
)}


{selectedRole === "social_worker" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for social workers */}
    <label htmlFor="full_name">:שם מלא</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">:מספר פלאפון</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail_address">:כתובת מייל</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">:סיסמא</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="organization_Name">:שם עמותה</label>
    <input type="text" id="organization_Name" name="organization_Name" value={formData.organization_Name} onChange={handleInputChange} required/><br />

    <button type="submit">שלח</button>
  </form>
)}

</div>
  )}    
  export default RegisterPage;