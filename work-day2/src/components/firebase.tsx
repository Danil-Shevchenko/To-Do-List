// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBko3riNolrejhOdp6ov9LlSBhmkdsrGR4",
  authDomain: "todo-list-a585a.firebaseapp.com",
  projectId: "todo-list-a585a",
  storageBucket: "todo-list-a585a.firebasestorage.app",
  messagingSenderId: "368826664040",
  appId: "1:368826664040:web:268e585172d13a934267dd",
  measurementId: "G-5FZ6XH215N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db = getFirestore(app);

export default app;