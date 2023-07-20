// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhuM2eC5DUsq6o-_dFbrpDUkGLPFcG8V8",
  authDomain: "bio-care-e0bab.firebaseapp.com",
  projectId: "bio-care-e0bab",
  storageBucket: "bio-care-e0bab.appspot.com",
  messagingSenderId: "353956651128",
  appId: "1:353956651128:web:44b05141ab2c2a07a04d8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
