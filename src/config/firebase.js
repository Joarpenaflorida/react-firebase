import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCGRXVYTzRJaTH77sfSk7HaQLqfVgBACjs",
   authDomain: "fir-basics-c417f.firebaseapp.com",
   projectId: "fir-basics-c417f",
   storageBucket: "fir-basics-c417f.appspot.com",
   messagingSenderId: "694265234389",
   appId: "1:694265234389:web:7f134a6fa8422d979df35c",
   measurementId: "G-3ZL6CXGW2M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
