// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4OMTGmLuEAip9xQ7nbocYr5-GbtSNCgQ",
  authDomain: "nextjs-todo-b28f6.firebaseapp.com",
  projectId: "nextjs-todo-b28f6",
  storageBucket: "nextjs-todo-b28f6.appspot.com",
  messagingSenderId: "89416282195",
  appId: "1:89416282195:web:2853b7868290f5956296a6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db }
