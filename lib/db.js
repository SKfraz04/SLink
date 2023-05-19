import { db } from "../lib/firebase";

export const updateUserProfile = async (data) => {
  const userRef = db.collection("users").doc(data.uid);

  try {
    await userRef.update(data);
    console.log("User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile: ", error);
  }
};
