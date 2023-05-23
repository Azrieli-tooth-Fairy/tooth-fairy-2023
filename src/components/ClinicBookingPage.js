import React, { useState , useEffect } from 'react';
import { setDoc, doc, collection, addDoc , getFirestore , onSnapshot, query } from 'firebase/firestore';
import {app, auth, db } from '../firebase'; // Import the Auth and Firestore instances from firebase.js
import emailjs from 'emailjs-com';

const ClinicBookingPage = () => {
  const [selectedQueue, setSelectedQueue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [reason, setReason] = useState('');
  const [referralClinic, setReferralClinic] = useState('');
  const [referralText, setReferralText] = useState('');

  const handleClinicChange = (event) => {
    // setClinic(event.target.value);
    setFormData({...formData,["clinic"]:event.target.value})
    setSelectedQueue('');
    setSelectedDate('');
    setReason('');
    setReferralClinic('');
    setReferralText('');
  };

  function handleSelection(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

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

//--------------------------------------------========-----EMAILJS - here were gonna send the admin the needed appointment
  const sendMailEmergency = (e) => {
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
// here we need to send mail to admin that the user sign in to firstAid clinic
  const sendMailFirstAid = (e) => {
    e.preventDefault();

    var id = document.getElementById("idCard").value;
    var social_worker_name = document.getElementById("social_worker_name").value;
    var social_worker_number = document.getElementById("social_worker_number").value;
    var referral_clinic = document.getElementById("referral_clinic").value;
    var referral_reason = document.getElementById("referral_reason").value;

    const serviceID = "toothFariyAdmin";
    const templateID = ""; // need to create new tamplate for first aid
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
const [formData, setFormData] = useState({
  idCard: "",
  date: "",
  queue: "",
  clinic: "",
  reason: "",
  referralClinic: ""
});
//stopped here 22-05=> started to work on checking if there are avilble time on the db!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const streamFormState = (snapshot, error) => {
  const itemsColRef = collection(db, 'appointments')
  const itemsQuery = query(itemsColRef)
  return onSnapshot(itemsQuery, snapshot, error);
};

const [formState, setFormState] = useState({ //testing!
  // apptAmount: [{date: "2023-05-28", queue: "14:00", count: 3},
  //             {date: "2023-05-28", queue: "15:00", count: 4}]
});
  useEffect(() => {
    const unsubscribe = streamState(
        (querySnapshot) => {
            const updatedState = 
            querySnapshot.docs.map(docSnapshot => docSnapshot.data());
            setFormState(updatedState);
        },
        (error) => setError('grocery-list-item-get-fail')
    );
    return unsubscribe;
  }, [, setProducts]);

const updateCount = (date, queue) => {
  const updatedApptAmount = formState.apptAmount.map((item) => {
    if (item.date === date && item.queue === queue) {
      console.log(item.count)
      return { ...item, count: item.count+1 };
    }
    return item;
  });

  setFormState((prevState) => ({
    ...prevState,
    apptAmount: updatedApptAmount
  }));
};

const getCount = (date, queue) => {
  return formState.apptAmount.find(
    (item) => item.date === date && item.queue === queue
  ).count;
};
 
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
    const appointmentsCollectionRef = collection(db, 'appointments');
    await addDoc(appointmentsCollectionRef, formData);
    // Reset the form fields
    console.log('Ticket submitted successfully!');

    if(formData.clinic === 'emergency'){
      sendMailEmergency(e);
    }
    else if(formData.clinic === 'firstAid'){
      sendMailFirstAid(e);
    }
  } catch (error) {
    console.error('Error submitting ticket:', error);
  }
};
//-------------------------------------------------EMAILJS
  let content = null;

  if (formData.clinic === 'sunday') {
    const sundayDates = generateSundayDates();
    content = (
      <div>
        <label htmlFor="idCard">ID Number:</label>
        <input type="number" id="idCard" 
          value={formData.idCard}
          onChange={handleInputChange}   
          required/>

        <h4>Select a Sunday date:</h4>
        <select name = "date" value={formData.date} onChange={(e) => handleSelection(e)}>
        <option value="">Available dates:</option>
        {sundayDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
        </select>

        {formData.date && ( //if we have date so show the houres
          <div>
            {/* here we need to connect with the firebase so we could tell when there is avilble appointment */}
            <h4>Select a queue time:</h4>
            <select
              name="queue"
              value={formData.queue}
              onChange={(e) => {
                handleSelection(e);
                updateCount(formData.date, e.target.value);
              }}
            >
              <option value="">Select a queue time:</option>
              <option
                value="14:00"
                disabled={getCount(formData.date, "14:00") >= 4}
              >
                14:00
              </option>
              <option
                value="15:00"
                disabled={getCount(formData.date, "15:00") >= 4}
              >
                15:00
              </option>
            </select>

          </div>
        )}

        {formData.queue && (
          <div>
            <h3>Selected Queue:</h3>
            <p>Date: {formData.date}</p>
            <p>Time: {formData.queue}</p>
          </div>
        )}
      </div>
    );
  } else if (formData.clinic === 'firstAid') {
    const firstAidDates = generateFirstAidDates();
    content = (
      <div>
        <label htmlFor="idCard">ID Card:</label>
        <input type="number" id="idCard" required/>

        <h4>Select a date for first aid:</h4>
        {firstAidDates.map((date) => (
          <button name="date" key={date} onClick={(e) => handleSelection(e)}>
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
  } else if (formData.clinic === 'emergency') {
    content = (
      <div>
        <label htmlFor="idCard">ID:</label>
        <input type="number" id="idCard" required/>

        <label htmlFor="social_worker_name">Social worker name:</label>
        <input type="text" id="social_worker_name" required/>

        <label htmlFor="social_worker_number">Social worker number:</label>
        <input type="number" id="social_worker_number" required/>

        <h4>Reason for Referral:</h4>
        <textarea name='reason' value={formData.reason} id = "referral_reason" onChange={(e) => handleSelection(e)} required/>

        <h4>Referral Clinic:</h4>
        <label>
          <input
            type="radio"
            name="referralClinic"
            value="sundayClinic"
            checked={referralClinic === 'sundayClinic'}
            onChange={(e) =>handleSelection(e)}
            id = "referral_clinic"
            required
          />
          Sunday Clinic
        </label>
        <label>
          <input
            type="radio"
            name="referralClinic"
            value="firstAidClinic"
            checked={referralClinic === 'firstAidClinic'}
            onChange={(e) =>handleSelection(e)}
            id = "referral_clinic"
            required
          />
          First Aid Clinic
        </label>
        <label>
          <input
            type="radio"
            name="referralClinic"
            value="other"
            checked={referralClinic === 'other'}
            onChange={(e) =>handleSelection(e)}
            id = "referral_clinic"
            required
          />
          Other:
          {/* <input type="text" value={referralText} onChange={handleReferralTextChange} required/> */}
          <input type="text" value={referralClinic} onChange={(e) =>handleSelection(e)} required/>
        </label>
        <h6>יצרו איתך קשר על מנת לתאם תור למיון</h6>
      </div>
    );
  }

  return (
    <div>
      <h2>Choose a Clinic:</h2>
      <select value={formData.clinic} onChange={handleClinicChange}>
        <option value="">Select Clinic</option>
        <option value="sunday">Sunday Clinic</option>
        <option value="firstAid">First Aid Clinic</option>
        <option value="emergency">Emergency Clinic</option>
      </select>
      <h1>{formData.clinic}</h1>
      {content}

      {formData.clinic && (
        <button type="submit" onClick={handleSubmit}>
          Submit request
        </button> 
      )}
    </div>
  );
};

export default ClinicBookingPage;
