import React from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>
        <form>
          <div className="input-group">
            <label>Họ tên</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập họ tên của bạn"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Tạo mật khẩu"
              required
            />
          </div>

          <div className="input-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button type="submit" className="btn">Đăng ký</button>

          <p className="switch-text">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
