// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth';

import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-e5XzGKCdNcCRUFk10XhNIGxU6f0c77s",
  authDomain: "react-cursos-bf4a2.firebaseapp.com",
  projectId: "react-cursos-bf4a2",
  storageBucket: "react-cursos-bf4a2.appspot.com",
  messagingSenderId: "618295923844",
  appId: "1:618295923844:web:f7d0b2c3a684e0b4cc9ed1"
};


// Initialize Firebase


// Aplicacion
export const FirebaseApp = initializeApp( firebaseConfig );

// El objeto que utilizamos para la autenticacion
export const FirebaseAuth = getAuth( FirebaseApp );

// Nuestras base de datos
export const FirebaseDB = getFirestore( FirebaseApp );