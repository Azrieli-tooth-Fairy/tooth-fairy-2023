
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp6NYYYuoJZp5chGih7ID-DWrSAJtHwBY",
  authDomain: "tooth-fairy-2023.firebaseapp.com",
  projectId: "tooth-fairy-2023",
  storageBucket: "tooth-fairy-2023.appspot.com",
  messagingSenderId: "392126870065",
  appId: "1:392126870065:web:bd71e8eeff2d2bf1399b10",
  measurementId: "G-MZCFP5ZHC5"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); // get the Auth instance from the app
// const db = getFirestore(app);


// Get the Auth instance
export const auth = getAuth(app);

// Get the Firestore instance
export const db = getFirestore(app);
export default app;