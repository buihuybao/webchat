import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Video from "../img/video.mp4";

const Login = () => {
  const [err, setErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Check if the required fields are not empty
    if (!email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper form-login">
        <span className="logo">Luna Chat</span>
        {/* <span className="logo">Luna Chat</span> */}
        <span className="title">Đăng Nhập</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <button>Đăng nhập</button>
          {err && <span>Sai tài khoản hoặc mật khẩu</span>}
          {errorMsg && <span>{errorMsg}</span>}
        </form>
        <p>Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link></p>
      </div>
      <div class="video-background">
            <div class="overlay"></div>
            <video src={Video} muted loop autoPlay></video>
      </div>
    </div>
  );
};

export default Login;
