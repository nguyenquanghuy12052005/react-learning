import React from "react";
// CSS được gộp chung vào VocabularyPage.scss hoặc tách riêng tùy bạn
import "./VocabularyPage.scss"; 

const VocabularyModal = ({ word, onClose }) => {
  if (!word) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header Modal: Icon to, Tên, Nút đóng */}
        <div className="modal-top-bar">
            <div className="modal-title-group">
                <div className="big-icon-circle">🏈</div>
                <h3 className="modal-word">{word.word}</h3>
            </div>
            <div className="modal-controls">
                <button className="icon-btn info">ⓘ</button>
                <button className="icon-btn save">💾</button>
                <button className="icon-btn close" onClick={onClose}>✖</button>
            </div>
        </div>

        {/* Phát âm */}
        <div className="pronunciation-section">
          <div className="pron-item">🔊 US {word.us}</div>
          <div className="pron-item">🔊 UK {word.uk}</div>
        </div>

        <div className="modal-scroll-content">
             {/* Tooltip & Actions Floating (Mô phỏng vị trí trong ảnh) */}
            <div className="action-buttons-floating">
                <button className="btn-action green">Sửa nghĩa</button>
                <button className="btn-action brown">Đặt câu</button>
            </div>

            {/* Ảnh minh họa */}
            <div className="image-wrapper">
                 <img src={word.image} alt={word.word} />
            </div>

            {/* Nội dung chi tiết */}
            <div className="definition-block">
            <div className="pos-label">noun</div>
            <p className="vn-mean">{word.meaningNoun}</p>
            
            <div className="eng-def-row">
                <span className="number">1.</span>
                <span className="eng-text">A word or set of words by which a person, animal, place, or thing is known.</span>
            </div>

            <div className="example-box">
                <div className="ex-label">Ví dụ:</div>
                <p className="ex-en">My <span className="highlight">{word.word}</span> is Parsons...</p>
                <p className="ex-vn">{word.exampleVN}</p>
            </div>

            <div className="divider"></div>

            <div className="pos-label">verb</div>
            <p className="vn-mean">{word.meaningVerb}</p>
            <div className="eng-def-row">
                <span className="number">1.</span>
                <span className="eng-text">Give a name to.</span>
            </div>
             <div className="example-box">
                <div className="ex-label">Ví dụ:</div>
                <p className="ex-en">{word.exampleEN}</p>
                <p className="ex-vn">{word.exampleVN}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyModal;