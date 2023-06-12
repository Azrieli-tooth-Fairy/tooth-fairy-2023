  import React, { useState } from 'react';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
  import './PatientForm.css'

  const PatientForm = () => {
      const [formData, setFormData] = useState({
          fullName: "",
          idCard: "",
          gender: "",
          nickName: "",
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
          const patientsCollectionRef = collection(db, 'tickets');
          await addDoc(patientsCollectionRef, formData);
        // Reset the form fields
        console.log('Patient submitted successfully!');
        alert("Patient submitted successfully!")
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
          <label htmlFor="nickName">:כינוי</label>
          <input
            type="text"
            id="nickName"
            value={formData.nickName}
            onChange={handleInputChange}
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
            <label htmlFor="status">סטאטוס מטופל</label>
            <select
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">בחירת סטאטוס</option>
              <option value="general">כללי</option>
              <option value="emergency_wait">ממתין למיון</option>
              <option value="sunday_clinic">'מרפאת יום א</option>
              <option value="student_care">מטופל אצל סטודנט</option>
              <option value="intern_care">מטופל אצל מתמחה</option>
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

// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js;
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBRadio,
//   MDBSelect,
// } from 'mdb-react-ui-kit';
// import './PatientForm.css';

// const PatientForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     idCard: '',
//     gender: '',
//     organization: '',
//     socialWorker: '',
//     phoneNumber: '',
//     entryPermit: false,
//     comments: '',
//     verified: false,
//     status: '',
//   });

//   const handleInputChange = (event) => {
//     const { id, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Create a new document in the "patients" collection with the form data
//     try {
//       const patientsCollectionRef = collection(db, 'tickets');
//       await addDoc(patientsCollectionRef, formData);
//       // Reset the form fields
//       console.log('Patient submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting patient:', error);
//     }
//   };

//   return (
//     <MDBContainer fluid className="bg-dark">
//       <MDBRow className="d-flex justify-content-center align-items-center h-100">
//         <MDBCol>
//           <MDBCard className="my-4">
//             <MDBRow className="g-0">
//               <MDBCol md="6" className="d-none d-md-block">
//                 <MDBCardImage
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
//                   alt="Sample photo"
//                   className="rounded-start"
//                   fluid
//                 />
//               </MDBCol>
//               <MDBCol md="6">
//                 <MDBCardBody className="text-black d-flex flex-column justify-content-center">
//                   <h3 className="mb-5 text-uppercase fw-bold">
//                     פתיחת כרטיס למטופל
//                   </h3>
//                   <form onSubmit={handleSubmit}>
//                     <MDBRow>
//                       <MDBCol md="6">
//                         <MDBInput
//                           wrapperClass="mb-4"
//                           label=":שם מלא"
//                           size="lg"
//                           id="fullName"
//                           type="text"
//                           value={formData.fullName}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </MDBCol>
//                       <MDBCol md="6">
//                         <MDBInput
//                           wrapperClass="mb-4"
//                           label=":מספר תז או דרכון"
//                           size="lg"
//                           id="idCard"
//                           type="text"
//                           value={formData.idCard}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </MDBCol>
//                     </MDBRow>
//                     <MDBRow>
//                       <MDBCol md="6">
//                         <label htmlFor="gender">מגדר</label>
//                         <select
//                           id="gender"
//                           className="form-select mb-4"
//                           value={formData.gender}
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">בחירת מגדר</option>
//                           <option value="male">זכר</option>
//                           <option value="female">נקבה</option>
//                           <option value="other">אחר</option>
//                         </select>
//                       </MDBCol>
//                       <MDBCol md="6">
//                         <MDBInput
//                           wrapperClass="mb-4"
//                           label=":שם עמותה"
//                           size="lg"
//                           id="organization"
//                           type="text"
//                           value={formData.organization}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </MDBCol>
//                     </MDBRow>
//                     <MDBRow>
//                       <MDBCol md="6">
//                         <MDBInput
//                           wrapperClass="mb-4"
//                           label=":שם עובד סוציאלי"
//                           size="lg"
//                           id="socialWorker"
//                           type="text"
//                           value={formData.socialWorker}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </MDBCol>
//                       <MDBCol md="6">
//                         <MDBInput
//                           wrapperClass="mb-4"
//                           label=":מספר פלאפון של העובד סוציאלי"
//                           size="lg"
//                           id="phoneNumber"
//                           type="text"
//                           value={formData.phoneNumber}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </MDBCol>
//                     </MDBRow>
//                     <div className="mb-4">
//                       <label htmlFor="entryPermit">?צריך אישור כניסה</label>
//                       <select
//                         id="entryPermit"
//                         className="form-select"
//                         name="entryPermit"
//                         value={formData.entryPermit}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="no">לא</option>
//                         <option value="yes">כן</option>
//                       </select>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="comments">:הערות נוספות</label>
//                       <textarea
//                         id="comments"
//                         className="form-control"
//                         value={formData.comments}
//                         onChange={handleInputChange}
//                         rows={2}
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label>
//                         <input
//                           id="verify"
//                           type="checkbox"
//                           className="form-check-input"
//                           value={formData.verified}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         .אני מאשר שכל המידע שמסרתי מדויק
//                       </label>
//                     </div>
//                     <div className="d-flex justify-content-end">
//                       <button type="submit" className="btn btn-primary">
//                         שלח
//                       </button>
//                     </div>
//                   </form>
//                 </MDBCardBody>
//               </MDBCol>
//             </MDBRow>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default PatientForm;
