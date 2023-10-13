import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import Video from "../img/video.mp4";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { upload } from "@testing-library/user-event/dist/upload";
import { useNavigate, Link } from "react-router-dom";
import { generateKeywords } from '../services';
import { Avatar } from "antd";
import addDocument from "../services";


const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("");
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState('');
  const downloadURL = "https://firebasestorage.googleapis.com/v0/b/studystream-6a108.appspot.com/o/2186b220-652b-4d8d-bd07-551fe31ae838?alt=media&token=da73a21d-9d79-46ae-ac7b-df07354a099f";
  const hometown = " ";
  const live = " ";
  const birthday = " ";
  const bio = " ";
  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewImage(reader.result);
  };
  if (file) {
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);

      var storageRef = await ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file).then(
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await addDocument('users', {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              keywords: generateKeywords(res.user.displayName),
              bio,
              hometown,
              birthday,
              live
            });
            navigate("/");
          });
        }
      )
      console.log(res);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Luna Chat</span>
        <span className="title">Tạo tài khoản</span>
        <form onSubmit={handleSubmit}>
          <input required
            type="text" placeholder="display name" />
          <input required
            type="email" placeholder="email" />
          <input required
            type="password" placeholder="password" />
          <input required
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            {previewImage ? (
              <div className='preview-avatar-register-form'>
                <img src={previewImage} alt="Preview"
                  className='preview-avatar-register'
                />
              </div>
            ) : <img src={Add} alt="" />
            }
            <span>Tải ảnh lên</span>
          </label>
          <button>Tạo tài khoản</button>
          {err && <span>Địa chỉ email đã được sử dụng !</span>}
          {errorMsg && <span>{errorMsg}</span>}
        </form>
        <p>
          Bạn đã có tài khoản? <Link to="/login">Login</Link>
        </p>
      </div>
      <div class="video-background">
        <div class="overlay"></div>
        <video src={Video} muted loop autoPlay></video>
      </div>
    </div>
  );
};

export default Register;