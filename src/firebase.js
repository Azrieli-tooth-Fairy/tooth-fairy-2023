import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {  getDocs , collection , getFirestore , query , where} from 'firebase/firestore';
// import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";

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

export const app = initializeApp(firebaseConfig);
// Get the Auth instance
export const auth = getAuth(app);
// Get the Firestore instance
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("login succses!")
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

export const fetchDocumentByFieldValue = async (collectionName, fieldName, fieldValue) => {
  const q = query(collection(db, collectionName), where(fieldName, '==', fieldValue));
  const querySnapshot = await getDocs(q);
  
  const documents = querySnapshot.docs.map((doc) => {let data = doc.data(); data.docId = doc.id; return data});
  
  return documents[0];
};

