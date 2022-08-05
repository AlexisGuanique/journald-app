// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth';

import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


// Your web app's Firebase configuration
// dev/Prod
const firebaseConfig = {
  apiKey: "AIzaSyB-e5XzGKCdNcCRUFk10XhNIGxU6f0c77s",
  authDomain: "react-cursos-bf4a2.firebaseapp.com",
  projectId: "react-cursos-bf4a2",
  storageBucket: "react-cursos-bf4a2.appspot.com",
  messagingSenderId: "618295923844",
  appId: "1:618295923844:web:f7d0b2c3a684e0b4cc9ed1"
};

// Pruebas con las variables de entonrno
///////////////////////////////////////////////////////////////////////
// TESTING
// const firebaseConfig = {
//   apiKey: "AIzaSyCJK4I8leY74bx3Vnk9eURoy0v2Og0hM2I",
//   authDomain: "react-curso-testing-c3cfa.firebaseapp.com",
//   projectId: "react-curso-testing-c3cfa",
//   storageBucket: "react-curso-testing-c3cfa.appspot.com",
//   messagingSenderId: "982034597630",
//   appId: "1:982034597630:web:1b9cd98df687edca7607af"
// };


// const firebaseConfig = {
//   apiKey: VITE_APIKEY,
//   authDomain: VITE_AUTHDOMAIN,
//   projectId: VITE_PROJECTID,
//   storageBucket: VITE_STORAGEBUCKET,
//   messagingSenderId: VITE_MESSAGINGSENDERID,
//   appId: VITE_APPID,
// };

// console.log({
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID,
// })

//////////////////////////////////////////////////////////////////////////



// Aplicacion
export const FirebaseApp = initializeApp( firebaseConfig );

// El objeto que utilizamos para la autenticacion
export const FirebaseAuth = getAuth( FirebaseApp );

// Nuestras base de datos
export const FirebaseDB = getFirestore( FirebaseApp );