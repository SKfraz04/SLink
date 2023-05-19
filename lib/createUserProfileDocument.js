import firebase from "./firebase";

const createUserProfileDocument = async (user) => {
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

export default createUserProfileDocument;
