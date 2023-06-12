// import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
// import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketForm.css'
// //רשימת הבקשות לתור - העובד הסוציאלי
// // שלב מעבר מקביעת התור עד שהתור הופך לפגישה
// // Ticket -> appoitment! needs to fix functunality
// // לאחר שהTICKET נעלם הוא לא משנה כלום 

// const TicketForm = () => {
//     const [formData, setFormData] = useState({
//         fullName: "",
//         idCard: "",
//         gender: "",
//         nickName: "",
//         organization: "",
//         socialWorker: "",
//         phoneNumber: "",
//         entryPermit: false,
//         comments: "",
//         verified: false,
//         status: ""
//     });

//     const handleInputChange = (event) => {
//         const { id, value } = event.target;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           [id]: value,
//         }));
//       };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Create a new document in the "tickets" collection with the form data
//     try {
//         const ticketsCollectionRef = collection(db, 'tickets');
//         await addDoc(ticketsCollectionRef, formData);
//       // Reset the form fields
//       console.log('Ticket submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting ticket:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>פתיחת כרטיס למטופל</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fullName">:שם מלא</label>
//           <input
//             type="text"
//             id="fullName"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="nickName">:כינוי</label>
//           <input
//             type="text"
//             id="nickName"
//             value={formData.nickName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="idCard">:מספר תז או דרכון</label>
//           <input
//             type="text"
//             id="idCard"
//             value={formData.idCard}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="gender">מגדר</label>
//           <select
//             id="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">בחירת מגדר</option>
//             <option value="male">זכר</option>
//             <option value="female">נקבה</option>
//             <option value="other">אחר</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="organization">:שם עמותה</label>
//           <input
//             type="text"
//             id="organization"
//             value={formData.organization}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="socialWorker">:שם עובד סוציאלי</label>
//           <input
//             type="text"
//             id="socialWorker"
//             value={formData.socialWorker}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">:מספר פלאפון של העובד סוציאלי</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="entryPermit">?צריך אישור כניסה</label>
//           <select
//             id="entryPermit"
//             name="entryPermit"
//             value={formData.entryPermit}
//             onChange={handleInputChange}
//             required
//             >
//             <option value="no">לא</option>
//             <option value="yes">כן</option>
//             </select>
//             </div>
//         <div>
//           <label htmlFor="comments">:הערות נוספות</label>
//           <textarea
//             id="comments"
//             value={formData.comments}
//             onChange={handleInputChange}
//             rows={2}
//           />
//         </div>
//         <div>
//           <label>
//             <input
//               id = "verify"
//               type="checkbox"
//               value={formData.verified}
//             //   if checked

//               onChange={handleInputChange}
//               required
//             />
//             .אני מאשר שכל המידע שמסרתי מדוייק
//           </label>
//         </div>
//         <button type="submit">שלח</button>
//       </form>
//     </div>
//   );
// };

// export default TicketForm;
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idCard: '',
    gender: '',
    nickName: '',
    organization: '',
    socialWorker: '',
    phoneNumber: '',
    entryPermit: false,
    comments: '',
    verified: false,
    status: '',
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2>פתיחת כרטיס למטופל</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>:שם מלא</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nickName">
              <Form.Label>:כינוי</Form.Label>
              <Form.Control
                type="text"
                value={formData.nickName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="idCard">
              <Form.Label>:מספר תז או דרכון</Form.Label>
              <Form.Control
                type="text"
                value={formData.idCard}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gender">
              <Form.Label>מגדר</Form.Label>
              <Form.Select
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">בחירת מגדר</option>
                <option value="male">זכר</option>
                <option value="female">נקבה</option>
                <option value="other">אחר</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="organization">
              <Form.Label>:שם עמותה</Form.Label>
              <Form.Control
                type="text"
                value={formData.organization}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="socialWorker">
              <Form.Label>:שם עובד סוציאלי</Form.Label>
              <Form.Control
                type="text"
                value={formData.socialWorker}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>:מספר פלאפון של העובד סוציאלי</Form.Label>
              <Form.Control
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="entryPermit">
              <Form.Label>?צריך אישור כניסה</Form.Label>
              <Form.Select
                value={formData.entryPermit ? 'yes' : 'no'}
                onChange={handleInputChange}
                required
              >
                <option value="no">לא</option>
                <option value="yes">כן</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="comments">
          <Form.Label>:הערות נוספות</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.comments}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="verify">
          <Form.Check
            type="checkbox"
            label=".אני מאשר שכל המידע שמסרתי מדוייק"
            checked={formData.verified}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit">שלח</Button>
      </Form>
    </div>
  );
};

export default TicketForm;
