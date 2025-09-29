// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeSGIHkzuhO-Hwn1pXQrTsaGC4BBHqhFk",
  authDomain: "parcel-cc9d0.firebaseapp.com",
  projectId: "parcel-cc9d0",
  storageBucket: "parcel-cc9d0.firebasestorage.app",
  messagingSenderId: "281895309027",
  appId: "1:281895309027:web:5293aa71464c8dba35ffd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export   const auth = getAuth(app);