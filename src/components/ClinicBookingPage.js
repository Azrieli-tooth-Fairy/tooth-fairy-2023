import React, { useState , useEffect } from 'react';
import { doc, getDocs , collection, addDoc , onSnapshot, query , updateDoc , where} from 'firebase/firestore';
import { db , fetchDocumentByFieldValue} from '../firebase'; // Import the Auth and Firestore instances from firebase.js
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

 
  const generateSundayDates = () => {
    const dates = [];
    const currentDate = new Date();
    const daysUntilSunday = (7 - currentDate.getDay()) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSunday);
  
    for (let i = 0; i < 4; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i * 7);
  
      const dayOfMonth = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const formattedDate = `${dayOfMonth}-${month}-${year}`;
      
      dates.push(formattedDate);
    }
  
    return dates;
  };
  


const generateFirstAidDates = () => {
  const dates = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

  for (let i = 0; i < 3; ) {
    const date = new Date(currentDate);
    const day = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (day !== 5 && day !== 6) {
      const dayOfMonth = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const formattedDate = `${dayOfMonth}-${month}-${year}`;
      // const formattedDate = `${year}-${month}-${dayOfMonth}`;
      dates.push(formattedDate);
      i++; // Increment i only if a valid date is added
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

//--------------------------------------------========-----EMAILJS - here were gonna send the admin the needed appointment
  const sendMailEmergency = (e) => {
    e.preventDefault();

    const serviceID = "toothFariyAdmin";
    const templateID = "template_avh8gs5";
    // const templateID = "template_jhtva3r"; // for test
    var params = {
        idCard: formData.idCard,
        name: formData.fullName,
        social_worker_name: formData.social_worker_name,
        social_worker_number: formData.social_worker_number,
        social_worker_mail: formData.social_worker_mail,
        referral_clinic: formData.referralClinic,
        reason: formData.reason,

      };

    emailjs
        .send(serviceID, templateID, params,"IY_q-mRXPfxKZKMHs") // need to hide this key!
        .then((res)=> {
            //alert(" הודעתך נשלחה בהצלחה");
        })
  }
  
const [formData, setFormData] = useState({
  idCard: "",
  fullName: "",
  date: "",
  queue: "",
  clinic: "",
  reason: "",
  referralClinic: "",
  fullName: "",
  birthDate: "",
  organizationName: "",
  isAccept: false,
  social_worker_name: "",
  social_worker_number: "",
  social_worker_mail: ""
});

const streamFormState = (snapshot, error) => {
  const itemsColRef = collection(db, 'appointments')
  const itemsQuery = query(itemsColRef)
  return onSnapshot(itemsQuery, snapshot, error);
};
//here were going to hendal the possebility of cancel sunday.
const [cancelDates, setCancelDates] = useState([]);

useEffect(() => {
  const fetchCancelDates = async () => {
    try {
      const cancelClinicCollectionRef = collection(db, 'cancelSundayClinic2');
      const cancelDatesSnapshot = await getDocs(cancelClinicCollectionRef);
      const cancelDatesData = cancelDatesSnapshot.docs.map((doc) => doc.data().date);
      setCancelDates(cancelDatesData);
    } catch (error) {
      console.log('Error fetching cancel clinic dates:', error);
    }
  };

  fetchCancelDates();
}, []);

const [formState, setFormState] = useState({ apptAmount: [] });

useEffect(() => { //this useEffect is for the sunday clinic, to check if there are already 4 patient in each time.
  const unsubscribe = streamFormState((snapshot) => {
    const aggregatedData = [...formState.apptAmount]; // Create a copy of the current apptAmount array

    snapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.date;
      const time = data.queue;

      // Check if an entry already exists for the date and time
      const existingEntryIndex = aggregatedData.findIndex(
        (entry) => entry.date === date && entry.queue === time
      );

      if (existingEntryIndex !== -1) {
        // If entry exists, increment the count
        aggregatedData[existingEntryIndex].count++;
      } else {
        // If entry doesn't exist, create a new entry
        aggregatedData.push({ date: date, queue: time, count: 1 });
      }
    });

    setFormState({ apptAmount: aggregatedData }); // Update the formState with the updated apptAmount

    return () => {
      // Cleanup function
      setFormState({ apptAmount: [] }); // Reset the formState when unsubscribing
    };
  });

  return unsubscribe;
}, [setFormState]);


const updateCount = (date, queue) => {};

const getCount = (date, queue) => {
  if (!date || !queue) return 0 ;
  let apptData = formState.apptAmount.find(
    (item) => item.date === date && item.queue === queue) ;
    if  (apptData)
      return apptData.count ;
  else 
    return 0 ;
  };
  //actualy, all this 50 rows of code hendel the same thing in the sunday clinic.

 
const handleInputChange = (event) => {
  const { id, value } = event.target;
  // if (id === "idCard" && value.length !== 9) {
  //   alert("אנא הכנס תז תקין");
  //   return;
  // }
  setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: value,
  }));
};


//just in case we have a problem with the new code below
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // Create a new document in the "tickets" collection with the form data
//   try {
//     const appointmentsCollectionRef = collection(db, 'appointments');
//     await addDoc(appointmentsCollectionRef, formData);
//     // const ticketsCollectionRef = collection(db, 'tickets'); //here were going to update status
//     const ticket = await fetchDocumentByFieldValue("tickets", "idCard", formData.idCard);
//     if (formData.idCard.length !== 9) {
//       alert("The ID card number must be exactly 9 digits.");
//       return;
//     }
//     if (formData.social_worker_number.length !== 10){
//       alert("The number must be exactly 10 digits.");
//       return;
//     }
//     if (formData.social_worker_number[0] !== "0" || formData.social_worker_number[1] !== "5"){
//       alert("The phone number must be valid!\nfor example (054-123-1234)");
//       return;
//     }
//     //here were going to check if this user status is general or not. if not - he cant sign to sunday clinic
//     if(ticket.status){
//       if (ticket.status !== "general" && formData.clinic === "sunday") {
//         alert("Patient status is not general, he can't sign in to sunday clinic");
//       }
//     }
//     else {
//       await updateDoc(doc(db, 'tickets', ticket.docId), {"status": formData.clinic});
//       // Reset the form fields
//       console.log('Ticket submitted successfully!');

//       if(formData.clinic === 'emergency_wait'){
//         sendMailEmergency(e);
//       }
//       else if(formData.clinic === 'firstAid'){
//         //sendMailFirstAid(e);
//       }
//     }
//   } catch (error) {
//     console.error('Error submitting ticket:', error);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if the given ID exists in the "tickets" collection
  const existingPatientQuery = query(
    collection(db, 'tickets'),
    where('idCard', '==', formData.idCard)
  );
  const existingPatientSnapshot = await getDocs(existingPatientQuery);
  
  if (existingPatientSnapshot.empty) {
    console.log('Patient does not exist!');
    alert('מטופל עם מספר תעודת הזהות הזה אינו קיים במערכת!');
    return;
  }
  try {
    const appointmentsCollectionRef = collection(db, 'appointments');
    await addDoc(appointmentsCollectionRef, formData);

    const ticket = await fetchDocumentByFieldValue("tickets", "idCard", formData.idCard);
    
    if (formData.idCard && formData.idCard.length !== 9) {
      alert("מספר תעודת הזהות צריך להיות בדיוק 9 ספרות");
      return;
    }
    if (formData.social_worker_number && formData.social_worker_number.length !== 10){
      if (formData.social_worker_number[0] !== "0" || formData.social_worker_number[1] !== "5"){
        alert("מספר הפלאפון צריך להיות זמין.\n לדוגמא (054-123-1324)");
        return;
      }
      alert("מספר הפלאפון צריך להיות 10 ספרות");
      return;
    }
    
    if(ticket.status){
      if (ticket.status !== "general" && formData.clinic === "sunday") {
        alert("ניתן להרשם למרפאת יום א' רק כשהמטופל בסטאטוס כללי");
        return;
      } 
    }
    await updateDoc(doc(db, 'tickets', ticket.docId), {"status": formData.clinic});
    if (formData.clinic === 'emergency_wait') {
      sendMailEmergency(e);
      alert("בקשתך בוצעה בהצלחה.\n במידה והתור יאושר, תקבל מייל עם פרטי התור")
    } else {
      alert("בקשה בוצעה בהצלחה!")
    }
    console.log('Ticket submitted successfully!');
  } catch (error) {
    console.error('Error submitting ticket:', error);
    alert("חובה לפתוח כרטיס למטופל לפני קביעת תור למרפאה")
  }
};


  let content = null;

  if (formData.clinic === 'sunday') {
    const sundayDates = generateSundayDates();
    content = (
      <div>
        <label htmlFor="idCard">:מספר תעודת זהות</label>
        <input type="number" id="idCard" 
          value={formData.idCard}
          onChange={handleInputChange}   
          required/>

        <h4>:בחר תאריך</h4>
        <select name="date" value={formData.date} onChange={(e) => handleSelection(e)}>
          <option value="">ימי ראשון זמינים</option>
          {sundayDates.map((date) => {
            const isDisabled = cancelDates.includes(date);
            return (
              <option key={date} value={date} disabled={isDisabled}>
                {date}
              </option>
            );
          })}
        </select>

        {formData.date && ( //if we have date so show the houres
          <div>
            {/* here we need to connect with the firebase so we could tell when there is avilble appointment */}
            <h4>בחר שעה</h4>
            <select
              name="queue"
              value={formData.queue}
              onChange={(e) => {
                handleSelection(e);
                updateCount(formData.date, e.target.value);
              }}
            >
              <option value="">שעות פנויות</option>
              <option
                value="14:00"
                disabled={getCount(formData.date, "14:00") >= 4 ? true : false}
              >

                14:00
              </option>
              <option
                value="15:00"
                disabled={getCount(formData.date, "15:00") >= 4 ? true : false}
              >
                15:00
              </option>
            </select>
            <label htmlFor="isAccept">"אני מאשר/ת כי המטופל/ת עליו/ה הזנתי את הפרטים לעיל נשלח/ת ל"פיית השיניים</label>
            <label htmlFor="isAccept">מטעם העמותה ו/או הארגון שצוינו לעיל</label>
            <input type="checkbox" id="isAccept" name="isAccept" value={formData.isAccept} onChange={handleInputChange} required/><br />
          </div>
        )}

        {formData.queue && (
          <div>
            <h3>התור שנבחר</h3>
            <p>{formData.date} :תאריך </p>
            <p>{formData.queue} :שעה </p>
          </div>
        )}
      </div>
    );
  } else if (formData.clinic === 'firstAid') {
    const firstAidDates = generateFirstAidDates();
    content = (
      <div>
        <label htmlFor="idCard">:מספר תעודת זהות</label>
        <input type="number" id="idCard" name='idCard' value={formData.idCard} onChange={handleInputChange} required />
        <h4>:בחר תאריך</h4>
        <select id="date" name="date" value={formData.date} onChange={handleInputChange} required>
          <option value="">בחר תאריך</option>
          {firstAidDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        
        <label htmlFor="isAccept">"אני מאשר/ת כי המטופל/ת עליו/ה הזנתי את הפרטים לעיל נשלח/ת ל"פיית השיניים</label>
        <label htmlFor="isAccept">מטעם העמותה ו/או הארגון שצוינו לעיל</label>
        <input type="checkbox" id="isAccept" name="isAccept" value={formData.isAccept} onChange={handleInputChange} required/><br />
    
        {formData.date && (
          <div>
            <h3>התור שנבחר</h3>
            <p>{formData.date} :תאריך</p>
            <p>שעה: 8:30</p>
          </div>
        )}
      </div>
    );
    
  } else if (formData.clinic === 'emergency_wait') {
    content = (
      <div>
        <label htmlFor="idCard">:מספר תעודת זהות</label>
        <input type="number" id="idCard" value={formData.idCard} name='idCard' onChange={handleInputChange} required/>

        <label htmlFor="fullName">:שם מלא</label>
        <input type="text" id="fullName" value={formData.fullName} name='fullName' onChange={handleInputChange} required style={{direction: 'rtl'}}/>

        <label htmlFor="birthDate">:תאריך לידה</label>
        <input type="date" id="birthDate" value={formData.birthDate} name='birthDate' onChange={handleInputChange} required/>

        <label htmlFor="organizationName">:שם עמותה</label>
        <input type="text" id="organizationName"value={formData.organizationName} name='organizationName' onChange={handleInputChange} style={{direction: 'rtl'}} required/>

        <label htmlFor="social_worker_name">:שם עובד סוציאלי</label>
        <input type="text" id="social_worker_name" value={formData.social_worker_name} name='social_worker_name' onChange={handleInputChange} required style={{direction: 'rtl'}}/>

        <label htmlFor="social_worker_number">:מס' פלאפון של עובד סוציאלי</label>
        <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="social_worker_number" value={formData.social_worker_number} name='social_worker_number' onChange={handleInputChange}  required/>

        <label htmlFor="social_worker_mail">:מייל של עובד סוציאלי</label>
        <input type="text" id="social_worker_mail" value={formData.social_worker_mail} name='social_worker_mail' onChange={handleInputChange} required/>

        <label htmlFor='reason'>:סיבת הפנייה</label>
        <textarea type="text" name='reason' value={formData.reason} id = "reason" onChange={(e) => handleSelection(e)} required style={{direction: 'rtl'}}/>

        <label htmlFor='referral_clinic'>:מרפאה מפנה</label>
        <input type="text" name='referralClinic' id ='referralClinic' value={formData.referralClinic} onChange={(e) =>handleSelection(e)} required style={{direction: 'rtl'}}/>


        <label htmlFor="isAccept">"אני מאשר/ת כי המטופל/ת עליו/ה הזנתי את הפרטים לעיל נשלח/ת ל"פיית השיניים</label>
        <label htmlFor="isAccept">מטעם העמותה ו/או הארגון שצוינו לעיל</label>
        <input type="checkbox" id="isAccept" name="isAccept" value={formData.isAccept} onChange={handleInputChange} required/><br />

        <h6>יצרו איתך קשר על מנת לתאם תור למיון</h6>
      </div>
    );
  }

  return (
    <div>
      <h1>קביעת תור למרפאה</h1>
      <br></br>
      <select value={formData.clinic} onChange={handleClinicChange}>
        <option value="">אנא בחר מרפאה</option>
        <option value="sunday" >מרפאת יום א</option>
        <option value="firstAid">מרפאת עזרה ראשונה</option>
        <option value="emergency_wait" >בקשה למרפאת מיון</option>
      </select>
      {/* <h1>{formData.clinic}</h1> */}
      {content}
      
      {formData.clinic && (
        <button type="submit" onClick={handleSubmit}>
          שלח בקשה
        </button> 
      )}
    </div>
  );
};

export default ClinicBookingPage;
