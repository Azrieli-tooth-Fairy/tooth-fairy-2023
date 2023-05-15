import React, { useState } from "react";
import "./SignIn.css"
import { createUserWithEmailAndPassword , getAuth} from "firebase/auth";
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import {app, auth, db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
// import app from '../firebase'; // Import the Firebase configuration
// const db = getFirestore(app);
// const auth = getAuth();

function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("");
  // const auth = props.auth;
  // const db = props.db;
  //=========================makeing some changes
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
    // form.reset();
    // setFormData({
    //   full_name: "",
    //   phone_number: "",
    //   mail: "",
    //   password: "",
    //   school_year: "",
    //   job_in_fairy: "",
    //   isAdmin: "",
    //   organization_Name: "",
    // });
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
      {/* alert("im here"); */}
      <h1>Register form</h1>
      <label htmlFor="role">Role:</label>
      <select id="role" name="role" value={selectedRole} onChange={handleRoleChange}>
        <option value="">Select a role</option>
        <option value="job_owner">Job Owner</option>
        <option value="student">Student</option>
        <option value="doctor">Doctor</option>
        <option value="social_worker">Social Worker</option>
      </select>

      {selectedRole === "job_owner" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for job owners */}
    <label htmlFor="full_name">Full name:</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">Phone number:</label>
    <input type="number" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange}required/><br />

    <label htmlFor="mail">Mail address:</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="school_year">School year:</label>
    <input type="text" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required/><br />

    <label htmlFor="job_in_fairy">Job in the Tooth Fairy:</label>
    <input type="text" id="job_in_fairy" name="job_in_fairy" value={formData.job_in_fairy} onChange={handleInputChange} required/><br />

    <label htmlFor="isAdmin">Is admin?</label>
    <input type="checkbox" id="isAdmin" name="isAdmin" value={formData.isAdmin} onChange={handleInputChange} required/><br />

    <button type="submit">Submit</button>
  </form>
)}


{selectedRole === "student" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for students */}
    <label htmlFor="full_name">Full name:</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">Phone number:</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail">Mail address:</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="school_year">School year:</label>
    <input type="text" id="school_year" name="school_year" value={formData.school_year} onChange={handleInputChange} required/><br />

    <button type="submit">Submit</button>
  </form>
)}


{selectedRole === "doctor" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for doctors */}
    <label htmlFor="full_name">Full name:</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">Phone number:</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail_address">Mail address:</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <button type="submit">Submit</button>
  </form>
)}


{selectedRole === "social_worker" && (
  <form onSubmit={handleFormSubmit}>
    {/* Fields for social workers */}
    <label htmlFor="full_name">Full name:</label>
    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/><br />

    <label htmlFor="phone_number">Phone number:</label>
    <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required/><br />

    <label htmlFor="mail_address">Mail address:</label>
    <input type="text" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required/><br />

    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/><br />

    <label htmlFor="organization_Name">Organization Name:</label>
    <input type="text" id="organization_Name" name="organization_Name" value={formData.organization_Name} onChange={handleInputChange} required/><br />

    <button type="submit">Submit</button>
  </form>
)}

</div>
  )}    
  export default RegisterPage;