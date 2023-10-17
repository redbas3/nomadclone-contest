// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7HbQVPSK13fHdBaNr15Ehmd5pKEZRB14",
  authDomain: "flash-score-c222f.firebaseapp.com",
  projectId: "flash-score-c222f",
  storageBucket: "flash-score-c222f.appspot.com",
  messagingSenderId: "784264913923",
  appId: "1:784264913923:web:5dd1da76a876f70b695a36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
