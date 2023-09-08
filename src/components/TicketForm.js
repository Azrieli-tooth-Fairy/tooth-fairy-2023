// import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
// import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketForm.css'

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
