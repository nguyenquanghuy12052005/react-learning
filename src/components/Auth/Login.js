import React from "react";
import "./Auth.scss";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng nhập</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email của bạn" required />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" required />
          </div>

          <button type="submit" className="btn">Đăng nhập</button>

          <p className="switch-text">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
