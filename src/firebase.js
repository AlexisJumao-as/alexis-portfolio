// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1C_94sP7EzWPt8N2XSOMwKi1eol7zKq0",
  authDomain: "to-do-ba363.firebaseapp.com",
  projectId: "to-do-ba363",
  storageBucket: "to-do-ba363.appspot.com",
  messagingSenderId: "598688324246",
  appId: "1:598688324246:web:1396a5b0536e6361f840b7",
  measurementId: "G-P9KYYWTBJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}
