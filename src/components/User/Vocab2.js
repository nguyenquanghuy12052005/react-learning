// src/components/User/Vocab2.js
import React from "react";
import SideBar from "./SideBar";
import "./Vocab2.scss";

// IMPORT ẢNH TỪ VỰNG THÔNG DỤNG (8 ảnh)
import common1 from "../../assets/td1.png";
import common2 from "../../assets/td2.png";
import common3 from "../../assets/td3.png";
import common4 from "../../assets/td4.png";
import common5 from "../../assets/td5.png";
import common6 from "../../assets/td6.png";
import common7 from "../../assets/td7.png";
import common8 from "../../assets/td8.png";

const commonVocab = [
  { title: "Từ vựng thông dụng", progress: "0/1606", bgImage: common1 },
  { title: "Oxford 3000", progress: "0/2977", bgImage: common2, isPlus: false },
  { title: "Oxford 5000 (không bao gồm Oxford 3000)", progress: "0/1995", bgImage: common3, isPlus: true },
  { title: "500 Danh từ tiếng Anh thông dụng nhất", progress: "0/500", bgImage: common4, isPlus: false },
  { title: "Động từ thông dụng", progress: "0/800", bgImage: common5, isPlus: true },
  { title: "Tính từ phổ biến", progress: "0/600", bgImage: common6, isPlus: false },
  { title: "Giới từ & Mạo từ", progress: "0/150", bgImage: common7, isPlus: false },
  { title: "Từ nối & Cụm từ", progress: "0/300", bgImage: common8, isPlus: true },
];

export default function Vocab2() {
  return (
    <div className="vocab2-page">
      <SideBar active="Từ vựng" />

      <main className="main-content">
        {/* === CHỈ GIỮ LẠI PHẦN TỪ VỰNG THÔNG DỤNG === */}
        <div className="common-section">
          <div className="section-title">
            <h2>Từ vựng thông dụng</h2>
            <span className="count">8 thư mục</span>
            <span className="arrow">Right Arrow</span>
          </div>

          <div className="common-grid">
            {commonVocab.map((item, index) => (
              <div
                key={index}
                className="common-card"
                style={{ backgroundImage: `url(${item.bgImage})` }}
              >
                <div className="overlay">
                  {item.isPlus && <span className="plus-badge">PLUS</span>}
                  <h4 className="title">{item.title}</h4>
                  <div className="progress">
                    <span className="check"> ✔</span>
                    <span className="text">{item.progress}</span>
                    <span className="lock"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}