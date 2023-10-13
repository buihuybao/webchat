import { auth, db } from "../firebase";
import firebase from "../firebase";

export const updateUserAndAuth = async (userId, fieldsToUpdate) => {

  try {
    // Cập nhật người dùng
    await db.collection("users").doc(userId).update(fieldsToUpdate);
    console.log("User updated successfully!");

    // Cập nhật thông tin đăng nhập
    const { email, displayName, photoURL } = fieldsToUpdate;
    if (email) {
      await auth.currentUser.updateEmail(email);
    }
    if (displayName || photoURL) {
      await auth.currentUser.updateProfile({
        displayName,
        photoURL,
      });
    }
    console.log("Authentication updated successfully!");
  } catch (error) {
    console.error("Error updating user and authentication: ", error);
  }
};



