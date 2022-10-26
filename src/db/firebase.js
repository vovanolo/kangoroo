// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDogu66y8PAVcVY_oH6iTKIP3dqnW_Wj-M",
  authDomain: "kangoroo-sadik.firebaseapp.com",
  databaseURL:
    "https://kangoroo-sadik-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kangoroo-sadik",
  storageBucket: "kangoroo-sadik.appspot.com",
  messagingSenderId: "332833576730",
  appId: "1:332833576730:web:f772b1d0a73f0e3e557ea3",
  measurementId: "G-J5YDRWSKNN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getAnalytics(app);
