import React, { useState } from 'react';
import { setDoc, doc, collection, addDoc , getFirestore } from 'firebase/firestore';
import app from '../firebase'; // Import the Firebase configuration
import './TicketForm.css'
const db = getFirestore(app);
const TicketForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        idCard: "",
        gender: "",
        organization: "",
        socialWorker: "",
        phoneNumber: "",
        entryPermit: false,
        comments: "",
        verified: false
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
        const ticketsCollectionRef = collection(db, 'tickets');
        await addDoc(ticketsCollectionRef, formData);
      // Reset the form fields
      console.log('Ticket submitted successfully!');
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div>
      <h2>Open a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="idCard">ID Card/Passport:</label>
          <input
            type="text"
            id="idCard"
            value={formData.idCard}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="organization">Name of Association/Organization:</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="socialWorker">Name of Social Worker:</label>
          <input
            type="text"
            id="socialWorker"
            value={formData.socialWorker}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Social Worker's Cell Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="entryPermit">Is an Entry Permit Necessary?</label>
          <select
            id="entryPermit"
            name="entryPermit"
            value={formData.entryPermit}
            onChange={handleInputChange}
            required
            >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            </select>
            </div>
        <div>
          <label htmlFor="comments">Comments:</label>
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
            I confirm that the details provided are accurate.
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;

