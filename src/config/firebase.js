import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAg8YtK5X1ckR7NltZBD6vu7zbDeddpjao",
    authDomain: "kangoroo-5b1e5.firebaseapp.com",
    projectId: "kangoroo-5b1e5",
    storageBucket: "kangoroo-5b1e5.appspot.com",
    messagingSenderId: "255719473092",
    appId: "1:255719473092:web:065df58fabca789e44ae91",
    measurementId: "G-TDDRDXMVY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app)