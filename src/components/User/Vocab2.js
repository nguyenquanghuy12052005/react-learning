// src/components/User/Vocab2.js
import React from "react";
import SideBar from "./SideBar";
import "./Vocab2.scss";

const commonVocab = [
  { 
    title: "Từ vựng thông dụng", 
    progress: "0/1606", 
    gradient: "gradient-blue",
    icon: "📚",
    isPlus: false
  },
  { 
    title: "Oxford 3000", 
    progress: "0/2977", 
    gradient: "gradient-purple",
    icon: "🎓",
    isPlus: false
  },
  { 
    title: "Oxford 5000 (không bao gồm Oxford 3000)", 
    progress: "0/1995", 
    gradient: "gradient-orange",
    icon: "🏆",
    isPlus: true
  },
  { 
    title: "500 Danh từ tiếng Anh thông dụng nhất", 
    progress: "0/500", 
    gradient: "gradient-green",
    icon: "📝",
    isPlus: false
  },
  { 
    title: "Động từ thông dụng", 
    progress: "0/800", 
    gradient: "gradient-indigo",
    icon: "⚡",
    isPlus: true
  },
  { 
    title: "Tính từ phổ biến", 
    progress: "0/600", 
    gradient: "gradient-pink",
    icon: "✨",
    isPlus: false
  },
  { 
    title: "Giới từ & Mạo từ", 
    progress: "0/150", 
    gradient: "gradient-teal",
    icon: "🔗",
    isPlus: false
  },
  { 
    title: "Từ nối & Cụm từ", 
    progress: "0/300", 
    gradient: "gradient-amber",
    icon: "🌟",
    isPlus: true
  },
];

export default function Vocab2() {
  return (
    <div className="vocab2-page">
      <SideBar active="Từ vựng" />

      <main className="main-content">
        {/* === HEADER === */}
        <div className="common-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Từ vựng thông dụng</h2>
              <span className="count">8 thư mục</span>
              <span className="arrow">→</span>
            </div>
            <p className="section-description">
              Khám phá và học từ vựng tiếng Anh thông dụng nhất
            </p>
          </div>

          {/* === GRID CARDS === */}
          <div className="common-grid">
            {commonVocab.map((item, index) => (
              <div key={index} className="common-card">
                {/* Gradient Background */}
                <div className={`card-gradient ${item.gradient}`}></div>
                
                {/* Pattern Overlay */}
                <div className="pattern-overlay"></div>
                
                {/* Hover Overlay */}
                <div className="hover-overlay"></div>

                {/* Plus Badge */}
                {item.isPlus && (
                  <div className="plus-badge">
                    <svg className="crown-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
                    </svg>
                    PLUS
                  </div>
                )}

                {/* Card Content */}
                <div className="card-content">
                  {/* Icon */}
                  <div className="card-icon">{item.icon}</div>

                  {/* Bottom Section */}
                  <div className="card-bottom">
                    <h4 className="card-title">{item.title}</h4>
                    
                    <div className="card-progress">
                      <div className="progress-info">
                        <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="progress-text">{item.progress}</span>
                      </div>
                      
                      {!item.isPlus && (
                        <div className="lock-icon-wrapper">
                          <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === STATS SECTION === */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper blue">
                <svg className="stat-icon blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3>Tổng từ vựng</h3>
            </div>
            <p className="stat-value">8,928</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper green">
                <svg className="stat-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3>Đã học</h3>
            </div>
            <p className="stat-value">0</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper amber">
                <svg className="stat-icon amber" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
                </svg>
              </div>
              <h3>Thư mục Plus</h3>
            </div>
            <p className="stat-value">3/8</p>
          </div>
        </div>
      </main>
    </div>
  );
}