
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyD6s_dOFVcGl8upPJXHnhQSkKVZYy411gk",
  authDomain:"slink-39230.firebaseapp.com",
  // databaseURL: "https://slink-39230-default-rtdb.firebaseio.com",
  projectId:"slink-39230",
  storageBucket: "slink-39230.appspot.com",
  messagingSenderId:"G-S6G1HDQ61E",
  appId:"1:35813320616:web:b7386593fab72bb7eb5f9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

