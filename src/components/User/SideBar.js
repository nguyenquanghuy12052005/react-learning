// src/components/User/SideBar.js
import React from "react";
import "./SideBar.scss";
import { Home, MessageCircle, BookOpen, Globe, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={18} />, text: "Trang chủ", path: "/homepage" },
    { icon: <MessageCircle size={18} />, text: "Trò chuyện", path: "/chatapp" }, // Đổi thành chatapp
    { icon: <BookOpen size={18} />, text: "Từ vựng", path: "/vocab2" },
    { icon: <Globe size={18} />, text: "Thế giới thực", path: "/forum" },
    { icon: <User size={18} />, text: "Tài khoản", path: "/userprofile" },
  ];

  return (
    <aside className="sidebar">
      <div className="user-info">
        <img
          src="https://placekitten.com/80/80"
          alt="avatar"
          className="avatar"
        />
        <p className="greeting">Xin chào</p>
        <h3 className="username">Ộ ii</h3>
        <span className="upgrade">👑 Nâng cấp</span>
      </div>

      <nav className="menu">
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={i}
              className={`menu-btn ${isActive ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          );
        })}
      </nav>

      <div className="app-links">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
        />
      </div>
    </aside>
  );
};

export default SideBar;
