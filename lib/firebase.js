import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6s_dOFVcGl8upPJXHnhQSkKVZYy411gk",
  authDomain: "slink-39230.firebaseapp.com",
  projectId: "slink-39230",
  databaseURL: "https://slink-39230-default-rtdb.firebaseio.com",
  storageBucket: "slink-39230.appspot.com",
  messagingSenderId: "G-S6G1HDQ61E",
  appId: "1:35813320616:web:b7386593fab72bb7eb5f9d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
import firebase from "./firebase";

export const createUserProfileDocument = async (user) => {
  if (!user) return;

  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  }
};

