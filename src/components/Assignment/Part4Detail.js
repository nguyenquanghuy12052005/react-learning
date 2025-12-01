import React, { useState } from 'react';
import { 
  FaArrowLeft, FaClock, FaCog, FaListUl, 
  FaPlay, FaPause, FaUndo, FaRedo, FaStepBackward, FaStepForward, 
  FaHeart, FaPen, FaExclamationTriangle, FaChevronDown 
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; 
import './Part4Detail.scss'; 

// --- DỮ LIỆU GIẢ LẬP ---
const generatePart4Data = () => {
  const data = [];
  let currentQ = 71; 
  for (let i = 1; i <= 10; i++) {
    const hasGraphic = i >= 9; // Câu 95-100 có hình
    const group = {
      id: i,
      hasGraphic: hasGraphic, 
      graphicImg: hasGraphic ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" : null,
      questions: []
    };
    for (let j = 0; j < 3; j++) {
      group.questions.push({
        qId: currentQ,
        text: `Question ${currentQ}: What is implied by the speaker about the new policy change in the company?`, // Text dài tí để test cuộn
        options: [
          { key: "A", text: "It will affect the marketing department significantly." },
          { key: "B", text: "It was requested by the management team." },
          { key: "C", text: "It is related to the accounting department." },
          { key: "D", text: "It will start next month." }
        ],
        correctAnswer: "B"
      });
      currentQ++;
    }
    data.push(group);
  }
  return data;
};

const MOCK_DATA_PART4 = generatePart4Data();

const Part4Detail = () => {
  const { id } = useParams();
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const currentTalk = MOCK_DATA_PART4[currentGroupIdx];

  const handleSelect = (qId, key) => {
    setUserAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const handleNext = () => {
    if (currentGroupIdx < MOCK_DATA_PART4.length - 1) setCurrentGroupIdx(prev => prev + 1);
  };
  
  const handlePrev = () => {
    if (currentGroupIdx > 0) setCurrentGroupIdx(prev => prev - 1);
  };

  return (
    <div className="part4-detail-page">
      {/* HEADER */}
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/toeic/part4" className="back-icon"><FaArrowLeft /></Link>
          <span className="question-title">
             Short Talks {String(id).padStart(2,'0')} : Q{currentTalk.questions[0].qId}-{currentTalk.questions[2].qId}
          </span>
        </div>
        <div className="header-right">
          <div className="timer"><FaClock /> <span>45:00</span></div>
          <FaCog className="icon-btn" />
          <FaListUl className="icon-btn" />
          <span className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
             {showSidebar ? "Ẩn Sidebar" : "Hiện Sidebar"}
          </span>
        </div>
      </header>

      {/* BODY - CỐ ĐỊNH, KHÔNG CUỘN CẢ TRANG */}
      <div className="quiz-body">
        
        {/* VÙNG CHỨA NỘI DUNG (Layout Flex) */}
        <div className={`content-wrapper ${currentTalk.hasGraphic ? 'layout-split' : 'layout-center'}`}>
            
            {/* 1. KHUNG ẢNH (Bên Trái) - Nếu có */}
            {currentTalk.hasGraphic && (
                <div className="static-panel-graphic">
                    <div className="panel-header green-header">
                        <span>Refer to this graphic</span>
                        <FaChevronDown />
                    </div>
                    <div className="graphic-image-container">
                        <img src={currentTalk.graphicImg} alt="Graphic" />
                    </div>
                </div>
            )}

            {/* 2. KHUNG CÂU HỎI (Bên Phải hoặc Giữa) - ĐÂY LÀ CARD SẼ CUỘN */}
            <div className="scrollable-question-card">
                <div className="questions-inner">
                    {currentTalk.questions.map((q) => (
                        <div key={q.qId} className="question-block">
                            <div className="panel-header blue-header">
                                <span>{q.qId}. {q.text}</span>
                            </div>
                            <div className="options-list">
                                {q.options.map((opt) => {
                                    const isSelected = userAnswers[q.qId] === opt.key;
                                    return (
                                        <div 
                                            key={opt.key} 
                                            className={`option-item ${isSelected ? 'selected' : ''}`}
                                            onClick={() => handleSelect(q.qId, opt.key)}
                                        >
                                            <div className="radio-circle">
                                                {isSelected && <div className="dot"></div>}
                                            </div>
                                            <span className="opt-text"><b>{opt.key}.</b> {opt.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* Sidebar */}
        {showSidebar && (
            <div className="column-sidebar">
               <div className="sidebar-title">Palette</div>
               {/* Nội dung sidebar */}
            </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="quiz-footer">
        <div className="audio-row-top">
            <div className="audio-controls">
               <FaUndo className="control-small" />
               <button className="btn-play" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay style={{marginLeft:'2px'}} />}
               </button>
               <FaRedo className="control-small" />
            </div>
            <div className="audio-progress">
               <input type="range" defaultValue="0" />
            </div>
            <div className="speed-text">1x</div>
         </div>
         <div className="audio-row-bottom">
            <button className="nav-arrow" onClick={handlePrev} disabled={currentGroupIdx===0}><FaStepBackward /></button>
            <div className="center-icons"><FaHeart /> <FaPen /> <FaExclamationTriangle /></div>
            <button className="nav-arrow" onClick={handleNext} disabled={currentGroupIdx===MOCK_DATA_PART4.length-1}><FaStepForward /></button>
         </div>
      </footer>
    </div>
  );
};

export default Part4Detail;