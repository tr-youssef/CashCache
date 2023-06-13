// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo48m3Wn7EI1CSUsA-ShuC_G9i-lmS8rw",
  authDomain: "budgetman-dd934.firebaseapp.com",
  projectId: "budgetman-dd934",
  storageBucket: "budgetman-dd934.appspot.com",
  messagingSenderId: "556714794544",
  appId: "1:556714794544:web:a7b58106eaf186b3d857f5",
};

// // Initialize Firebase
// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app;
// }
// const auth = firebase.auth();
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
