import React, { useState } from "react";
import "./SignIn.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js


function RegisterPage() {

  const [formData, setFormData] = useState({    
    full_name: "",
    phone_number: "",
    mail: "",
    password: "",
    school_year: "",
    job_in_fairy: "",
    isAdmin: false, 
    organization_Name: "",
    newOrganization: false, 
    role: ""
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target; // Get the form element
    // form.elements.role.value = selectedRole !== "" ? selectedRole : formData.role;
    const userEmail = form.elements.mail.value; // Get the value of the "mail" input
    const userPassword = form.elements.password.value; // Get the value of the "password" input

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        handleSubmit();
        console.log('signIn successful');
        alert("signIn successful!");
        form.reset();
      })
      .catch((error) => {
        console.log('Login error', error);
      });
  };

  return (
    <div className="input-form">
      <h1>טופס רישום</h1>
      <label htmlFor="role">:תפקיד</label>
      <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
        <option value="">בחר תפקיד</option>
        <option value="job_owner">בעל תפקידים</option>
        <option value="student">סטודנט</option>
        <option value="doctor">רופא</option>
        <option value="social_worker">עובד סוציאלי</option>
      </select>

{formData.role === "job_owner" && (
  <form onSubmit={handleFormSubmit} className="row g-3">
    {/* Fields for job owners */}
    <div className="col-12">
      <label htmlFor="full_name" className="form-label">שם מלא:</label>
      <input type="text" className="form-control" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="phone_number" className="form-label">:מספר פלאפון</label>
      <input type="number" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="mail" className="form-label">:כתובת מייל</label>
      <input type="text" className="form-control" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="password" className="form-label">:סיסמא</label>
      <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="school_year" className="form-label">:שנת לימודים</label>
      <input type="text" className="form-control" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="job_in_fairy" className="form-label">:תפקיד בפייה</label>
      <input type="text" className="form-control" id="job_in_fairy" name="job_in_fairy" value={formData.job_in_fairy} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="isAdmin" name="isAdmin" value={formData.isAdmin} onChange={handleInputChange} required />
        <label htmlFor="isAdmin" className="form-check-label">Is admin?</label>
      </div>
    </div>

    <div className="col-12 text-center">
      <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>שלח</button>
    </div>
  </form>
)}

{formData.role === "student" && (
  <form onSubmit={handleFormSubmit} className="row g-3">
    {/* Fields for students */}
    <div className="col-12">
      <label htmlFor="full_name" className="form-label">:שם מלא</label>
      <input type="text" className="form-control" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="phone_number" className="form-label">:מספר פלאפון</label>
      <input type="text" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="mail" className="form-label">:כתובת מייל</label>
      <input type="text" className="form-control" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="password" className="form-label">:סיסמא</label>
      <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="school_year" className="form-label">:שנת לימודים</label>
      <input type="text" className="form-control" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12 text-center">
      <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>שלח</button>
    </div>
  </form>
)}

{formData.role === "doctor" && (
  <form className="row g-3" onSubmit={handleFormSubmit}>
    <div className="col-12">
      <label htmlFor="full_name" className="form-label">:שם מלא</label>
      <input type="text" className="form-control form-control-sm" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="phone_number" className="form-label">:מספר פלאפון</label>
      <input type="tel" className="form-control form-control-sm" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="mail_address" className="form-label">:כתובת מייל</label>
      <input type="text" className="form-control form-control-sm" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="password" className="form-label">:סיסמא</label>
      <input type="password" className="form-control form-control-sm" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12 text-center">
      <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>שלח</button>
    </div>
  </form>
)}


{formData.role === "social_worker" && (
  <form onSubmit={handleFormSubmit} className="row g-3">
    {/* Fields for social workers */}
    <div className="col-12">
      <label htmlFor="full_name" className="form-label">:שם מלא</label>
      <input type="text" className="form-control" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="organization_Name" className="form-label">:שם עמותה</label>
      <input type="text" className="form-control" id="organization_Name" name="organization_Name" value={formData.organization_Name} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="newOrganization" name="newOrganization" value={formData.new_organization} onChange={handleInputChange} />
        <label htmlFor="newOrganization" className="form-check-label">סמן אם זו עמותה חדשה</label>
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="phone_number" className="form-label">:מספר פלאפון</label>
      <input type="tel" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="mail_address" className="form-label">:כתובת מייל</label>
      <input type="email" className="form-control" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <div className="col-12">
      <label htmlFor="password" className="form-label">:סיסמא</label>
      <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '150px', textAlign: 'right' }} />
    </div>

    <input type="hidden" id="role" name="role" value={formData.role} onChange={handleInputChange} />

    <div className="col-12 text-center">
      <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>שלח</button>
    </div>
  </form>
)}

</div>
  )}    
  export default RegisterPage;