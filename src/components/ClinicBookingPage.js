import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ClinicBookingPage = () => {
  const [clinic, setClinic] = useState('');
  const [selectedQueue, setSelectedQueue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [reason, setReason] = useState('');
  const [referralClinic, setReferralClinic] = useState('');
  const [referralText, setReferralText] = useState('');

  const handleClinicChange = (event) => {
    setClinic(event.target.value);
    setSelectedQueue('');
    setSelectedDate('');
    setReason('');
    setReferralClinic('');
    setReferralText('');
  };

  const handleQueueSelection = (queue) => {
    setSelectedQueue(queue);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleReferralClinicChange = (event) => {
    setReferralClinic(event.target.value);
  };

  const handleReferralTextChange = (event) => {
    setReferralText(event.target.value);
  };

  // Helper function to generate Sunday dates
  const generateSundayDates = () => {
    const dates = [];
    const currentDate = new Date();
    const daysUntilSunday = (7 - currentDate.getDay()) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSunday);

    for (let i = 0; i < 4; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i * 7);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  };

// Helper function to generate next three available dates for first aid clinic (excluding Fridays and Saturdays)
const generateFirstAidDates = () => {
    const dates = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow
    for (let i = 0; i < 3; ) {
      const date = new Date(currentDate);
      const day = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      if (day !== 5 && day !== 6) {
        dates.push(date.toISOString().split('T')[0]);
        i++; // Increment i only if a valid date is added
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  };

// this func hendel the submit bnt. here were going send the mail to the admin and he will 
// aprove or deny the request!
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Handle form submission logic here
  //   console.log('Submitted!');
  // };
//--------------------------------------------========-----EMAILJS - here were gonna send the admin the needed appointment
  const sendMail = (e) => {
    e.preventDefault();

    var id = document.getElementById("idCard").value;
    var social_worker_name = document.getElementById("social_worker_name").value;
    var social_worker_number = document.getElementById("social_worker_number").value;
    var referral_clinic = document.getElementById("referral_clinic").value;
    var referral_reason = document.getElementById("referral_reason").value;

    const serviceID = "toothFariyAdmin";
    const templateID = "template_avh8gs5";
    // const templateID = "template_jhtva3r"; // for test
    var params = {
        id: id,
        social_worker_name: social_worker_name,
        social_worker_number: social_worker_number,
        referral_clinic: referral_clinic,
        referral_reason: referral_reason
    };

    emailjs
        .send(serviceID, templateID, params,"IY_q-mRXPfxKZKMHs") // need to hide this key!
        .then((res)=> {
            
            // console.log(res);
            alert("הודעתך נשלחה בהצלחה");
        })

}
//-------------------------------------------------EMAILJS
  let content = null;

  if (clinic === 'sunday') {
    const sundayDates = generateSundayDates();
    content = (
      <div>
        <label htmlFor="idCard">ID Card:</label>
        <input type="number" id="idCard" required/>

        <h4>Select a Sunday date:</h4>
        {sundayDates.map((date) => (
          <button key={date} onClick={() => handleDateSelection(date)}>
            {date}
          </button>
        ))}

        {selectedDate && (
          <div>
            {/* here we need to connect with the firebase so we could tell when there is avilble appointment */}
            <h4>Select a queue time:</h4>
            <button onClick={() => handleQueueSelection('14:00')}>14:00</button>
            <button onClick={() => handleQueueSelection('15:00')}>15:00</button>
            {/* <h4>Select a queue time:</h4>
            <button onClick={() => handleQueueSelection('14:00')}>14:00</button>
            <button onClick={() => handleQueueSelection('15:00')}>15:00</button> */}
          </div>
        )}

        {selectedQueue && (
          <div>
            <h3>Selected Queue:</h3>
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedQueue}</p>
          </div>
        )}
      </div>
    );
  } else if (clinic === 'firstAid') {
    const firstAidDates = generateFirstAidDates();
    content = (
      <div>
        <label htmlFor="idCard">ID Card:</label>
        <input type="number" id="idCard" required/>

        <h4>Select a date for first aid:</h4>
        {firstAidDates.map((date) => (
          <button key={date} onClick={() => handleDateSelection(date)}>
            {date}
          </button>
        ))}

        {selectedDate && (
          <div>
            <h3>Selected Date for First Aid:</h3>
            <p>Date: {selectedDate}</p>
            <p>Time: 8:30</p>
          </div>
        )}
      </div>
    );
  } else if (clinic === 'emergency') {
    content = (
      <div>
        <label htmlFor="idCard">ID:</label>
        <input type="number" id="idCard" required/>

        <label htmlFor="social_worker_name">Social worker name:</label>
        <input type="text" id="social_worker_name" required/>

        <label htmlFor="social_worker_number">Social worker number:</label>
        <input type="number" id="social_worker_number" required/>

        <h4>Reason for Referral:</h4>
        <textarea value={reason} id = "referral_reason" onChange={handleReasonChange} required/>

        <h4>Referral Clinic:</h4>
        <label>
          <input
            type="radio"
            value="sundayClinic"
            checked={referralClinic === 'sundayClinic'}
            onChange={handleReferralClinicChange}
            id = "referral_clinic"
            required
          />
          Sunday Clinic
        </label>
        <label>
          <input
            type="radio"
            value="firstAidClinic"
            checked={referralClinic === 'firstAidClinic'}
            onChange={handleReferralClinicChange}
            id = "referral_clinic"
            required
          />
          First Aid Clinic
        </label>
        <label>
          <input
            type="radio"
            value="other"
            checked={referralClinic === 'other'}
            onChange={handleReferralClinicChange}
            id = "referral_clinic"
            required
          />
          Other:
          {/* <input type="text" value={referralText} onChange={handleReferralTextChange} required/> */}
          <input type="text" value={referralClinic} onChange={handleReferralClinicChange} required/>
        </label>
        <h6>יצרו איתך קשר על מנת לתאם תור למיון</h6>
      </div>
    );
  }

  return (
    <div>
      <h2>Choose a Clinic:</h2>
      <select value={clinic} onChange={handleClinicChange}>
        <option value="">Select Clinic</option>
        <option value="sunday">Sunday Clinic</option>
        <option value="firstAid">First Aid Clinic</option>
        <option value="emergency">Emergency Clinic</option>
      </select>

      {content}

      {clinic && (
        <button type="submit" onClick={sendMail}>
          Submit request
        </button>
      )}
    </div>
  );
};

export default ClinicBookingPage;
