import React from "react";
import "./Auth.scss";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>
        <form>
          <div className="input-group">
            <label>Họ tên</label>
            <input type="text" placeholder="Nhập họ tên của bạn" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email của bạn" required />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Tạo mật khẩu" required />
          </div>

          <div className="input-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" placeholder="Nhập lại mật khẩu" required />
          </div>

          <button type="submit" className="btn">Đăng ký</button>

          <p className="switch-text">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
