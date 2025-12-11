import React, { useState } from "react";
import SideBar from "./SideBar";
import VocabDetail from "./VocabDetail";
import "./Vocab2.scss";

// Dữ liệu các bộ từ vựng (Trang chủ)
const commonVocab = [
  { 
    id: 1,
    title: "Tiếng Anh Cơ Bản", // Giả sử bộ này chứa các bài trong ảnh của bạn
    progress: "0/...", 
    gradient: "gradient-blue",
    icon: "🎓",
    isPlus: false
  },
  { 
    id: 2,
    title: "Tiếng Anh Toeic", 
    progress: "0/..", 
    gradient: "gradient-purple",
    icon: "💼",
    isPlus: false
  },
  { 
    id: 3,
    title: "IELTS Cơ bản", 
    progress: "0/1995", 
    gradient: "gradient-orange",
    icon: "🏆",
    isPlus: true
  },
  { 
    id: 4,
    title: "500 Danh từ", 
    progress: "0/500", 
    gradient: "gradient-green",
    icon: "📝",
    isPlus: false
  },
];

export default function Vocab2() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="vocab2-page">
      <SideBar active="Từ vựng" />

      <main className="main-content">
        {selectedTopic ? (
          <VocabDetail 
            topic={selectedTopic} 
            onBack={() => setSelectedTopic(null)} 
          />
        ) : (
          <>
            <div className="common-section">
              <div className="section-header">
                <div className="section-title">
                  <h2>Thư viện từ vựng</h2>
                  <span className="count">4 thư mục</span>
                </div>
                <p className="section-description">Chọn bộ từ vựng để bắt đầu học theo chủ đề</p>
              </div>

              <div className="common-grid">
                {commonVocab.map((item, index) => (
                  <div 
                    key={index} 
                    className="common-card"
                    onClick={() => setSelectedTopic(item)}
                  >
                    <div className={`card-gradient ${item.gradient}`}></div>
                    <div className="pattern-overlay"></div>
                    
                    {item.isPlus && (
                      <div className="plus-badge">PLUS</div>
                    )}

                    <div className="card-content">
                      <div className="card-icon">{item.icon}</div>
                      <div className="card-bottom">
                        <h4 className="card-title">{item.title}</h4>
                        <div className="card-progress">
                          <span className="progress-text">{item.progress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}