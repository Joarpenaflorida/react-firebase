import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
   createUserWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";

export const Auth = () => {
   const [data, setData] = useState({});
   const handleInput = (event) => {
      let newInput = { [event.target.name]: event.target.value };
      setData({ ...data, ...newInput });
      console.log(data);
   };
   console.log(auth?.currentUser);
   const signIn = async () => {
      try {
         await createUserWithEmailAndPassword(auth, data.email, data.password);
      } catch (err) {
         console.error(err);
      }
   };
   const signInWithGoogle = async () => {
      try {
         await signInWithPopup(auth, googleProvider);
      } catch (err) {
         console.error(err);
      }
   };
   const logout = async () => {
      try {
         await signOut(auth);
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div>
         <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={(event) => handleInput(event)}
            required
         />
         <input
            type="password"
            placeholder="Password..."
            name="password"
            onChange={(event) => handleInput(event)}
            required
         />

         <button onClick={signIn}>Sign In</button>
         <button onClick={signInWithGoogle}>Sign In With Google</button>
         <button onClick={logout}>Logout</button>
      </div>
   );
};
