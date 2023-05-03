// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSEbLQXyAc2m0fNIfowGztGDfmUuTUZ5s",
    authDomain: "designscout-2023.firebaseapp.com",
    projectId: "designscout-2023",
    storageBucket: "designscout-2023.appspot.com",
    messagingSenderId: "99001237707",
    appId: "1:99001237707:web:28bd21ddf19e7b32d0db4e",
    measurementId: "G-DE5QK2EX8N"
  };

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
