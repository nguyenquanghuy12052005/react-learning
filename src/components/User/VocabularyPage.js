import React, { useState } from "react";
import "./VocabularyPage.scss";
import VocabularyModal from "./VocabularyModal";

const defaultWords = [
  { word: "name", type: "noun", shortMeaning: "tên, danh tánh", us: "/neɪm/", uk: "/neɪm/", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hello_my_name_is_sticker.svg/1200px-Hello_my_name_is_sticker.svg.png", meaningNoun: "tên, danh tánh, danh nghĩa, tiếng tăm, danh nhân, dòng họ", meaningVerb: "đặt tên, gọi tên, định rõ, chỉ định, nói rõ, bổ nhiệm", exampleEN: "My name is Parsons, John Parsons.", exampleVN: "Tên tôi là Parsons, John Parsons." },
  { word: "call", type: "verb", shortMeaning: "gọi, mời", us: "/kɔːl/", uk: "/kɔːl/", image: "https://cdn-icons-png.flaticon.com/512/724/724664.png", meaningNoun: "tiếng kêu", meaningVerb: "gọi điện, mời đến", exampleEN: "I will call you later.", exampleVN: "Tôi sẽ gọi bạn sau." },
  { word: "friend", type: "noun", shortMeaning: "người bạn, bạn bè", us: "/frend/", uk: "/frend/", image: "https://cdn-icons-png.flaticon.com/512/3002/3002655.png", meaningNoun: "người bạn, đồng minh", meaningVerb: "kết bạn", exampleEN: "He is my best friend.", exampleVN: "Anh ấy là bạn thân nhất của tôi." },
  { word: "hello", type: "exclamation", shortMeaning: "chào, lời chào", us: "/həˈloʊ/", uk: "/həˈləʊ/", image: "https://cdn-icons-png.flaticon.com/512/10857/10857059.png", meaningNoun: "lời chào", meaningVerb: "chào hỏi", exampleEN: "Hello, nice to meet you.", exampleVN: "Xin chào, rất vui được gặp bạn." },
];

const VocabularyPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div className="vocab-page-container">
      {/* HEADER */}
      <header className="page-header">
        <button className="btn-back">❮</button>
        <div className="header-info">
          <div className="icon-header">🖼️</div>
          <div className="header-text">
            <h2>Bộ từ vựng số 1</h2>
            <div className="progress-badge">
              <span>✔ 0/6 đã học</span>
              <span>◐ 0 cần luyện tập</span>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="vocab-body">
        {/* DANH SÁCH TỪ */}
        <div className="word-grid">
          {defaultWords.map((w, idx) => (
            <div key={idx} className="word-card" onClick={() => setSelectedWord(w)}>
              <div className="card-icon">
                <div className="inner-icon">🏈</div>
              </div>
              <div className="card-content">
                <div className="word-top">
                  <span className="word-text">{w.word}</span>
                </div>
                <div className="word-meta">
                  <span className="word-type">({w.type})</span>
                  <span className="word-mean">{w.shortMeaning}</span>
                </div>
              </div>
              <div className="card-action">
                <button className="btn-save">💾</button>
              </div>
            </div>
          ))}
        </div>

        {/* NÚT DƯỚI CÙNG (Đã sửa) */}
        <div className="bottom-action-bar">
           <button className="btn-large btn-learn">📘 Học từ mới</button>
           <button className="btn-large btn-practice">🔥 Luyện tập</button>
        </div>
      </div>

      {/* POPUP */}
      {selectedWord && <VocabularyModal word={selectedWord} onClose={() => setSelectedWord(null)} />}
    </div>
  );
};

export default VocabularyPage;