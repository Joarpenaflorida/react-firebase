import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import {
   getDocs,
   collection,
   addDoc,
   deleteDoc,
   updateDoc,
   doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
   const [movieList, setMovieList] = useState([]);
   // New Movie States

   const [updatedTitle, setUpdatedTitle] = useState("");

   const [newMovieTitle, setNewMovieTitle] = useState("");
   const [newReleaseDate, setNewReleaseDate] = useState(0);
   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
   // File Upload State
   const [fileUpload, setFileUpload] = useState(null);

   const moviesCollectionRef = collection(db, "movies");

   const getMovieList = async () => {
      try {
         const data = await getDocs(moviesCollectionRef);
         const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));

         setMovieList(filteredData);
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      getMovieList();
   }, []);

   const onSubmitMovie = async () => {
      try {
         await addDoc(moviesCollectionRef, {
            title: newMovieTitle,
            releaseDate: newReleaseDate,
            receivedAnOscar: isNewMovieOscar,
            userId: auth?.currentUser?.uid,
         });
         getMovieList();
      } catch (err) {
         console.error(err);
      }
   };

   const onDeleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      try {
         await deleteDoc(movieDoc);
         getMovieList();
      } catch (err) {
         console.error(err);
      }
   };

   const onUpdateMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      try {
         await updateDoc(movieDoc, { title: updatedTitle });
         getMovieList();
      } catch (err) {
         console.error(err);
      }
   };

   const uploadFile = async () => {
      if (!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFile/${fileUpload.name}`);
      try {
         await uploadBytes(filesFolderRef, fileUpload);
      } catch (err) {
         console.error(err);
      }
   };
   return (
      <div className="App">
         <Auth />
         <div>
            <input
               type="text"
               placeholder="Movie Title"
               onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <input
               type="number"
               placeholder="Release Date"
               onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />
            <input
               type="checkbox"
               checked={isNewMovieOscar}
               onChange={(e) => setIsNewMovieOscar(e.target.checked)}
            />
            <label htmlFor="">Received an Oscar</label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
         </div>
         <div>
            {movieList.map((movie) => (
               <div>
                  <h1
                     style={{ color: movie.receivedAnOscar ? "green" : "red" }}
                  >
                     {movie.title}
                  </h1>
                  <p>{movie.releaseDate}</p>
                  <button onClick={() => onDeleteMovie(movie.id)}>
                     Delete Movie
                  </button>
                  <input
                     type="text"
                     placeholder="new title..."
                     onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <button onClick={() => onUpdateMovie(movie.id)}>
                     Update Title
                  </button>
               </div>
            ))}
         </div>
         <div>
            <input
               type="file"
               onChange={(e) => setFileUpload(e.target.files[0])}
            />
            <button onClick={uploadFile}>Upload File</button>
         </div>
      </div>
   );
}

export default App;
