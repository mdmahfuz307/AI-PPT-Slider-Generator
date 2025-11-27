// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr6gMXxe7QwDLlDVA3U1J6iMBt4HJJK7g",
  authDomain: "ai-ppt-slider-generator.firebaseapp.com",
  projectId: "ai-ppt-slider-generator",
  storageBucket: "ai-ppt-slider-generator.firebasestorage.app",
  messagingSenderId: "677673154378",
  appId: "1:677673154378:web:b9176aa4e5315a776cf3b3",
  measurementId: "G-C1GM91ZGJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);
export const firebaseAuth = getAuth(app);