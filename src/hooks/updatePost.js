import { auth, db } from "../firebase";

export const updatePost = async (id, fieldsToUpdate) => {

  try {
    // Cập nhật bài viết
    await db.collection("posts").doc(id).update(fieldsToUpdate);
    console.log("Post updated successfully!");
  } catch (error) {
    console.error("Error updating: ", error);
  }
};



