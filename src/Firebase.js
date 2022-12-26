// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqgHiM6Zzf9xSxAYY8ohnzVYW-ZhS2l0Y",
  authDomain: "stocktracker-62de5.firebaseapp.com",
  projectId: "stocktracker-62de5",
  storageBucket: "stocktracker-62de5.appspot.com",
  messagingSenderId: "371048000102",
  appId: "1:371048000102:web:f5dd09853e291e14ed5ba7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);