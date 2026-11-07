// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzNDIoToFD2IWyI4hd1GQ7FCNjXikVN6Q",
  authDomain: "donde-e.firebaseapp.com",
  projectId: "donde-e",
  storageBucket: "donde-e.firebasestorage.app",
  messagingSenderId: "796484572178",
  appId: "1:796484572178:web:b44ec3cc21a40ace0f34cb",
  measurementId: "G-HK5S6S06GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);