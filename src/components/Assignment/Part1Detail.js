import React, { useState } from 'react';
import { 
  FaArrowLeft, FaClock, FaCog, FaListUl, 
  FaPlay, FaPause, FaUndo, FaRedo, FaStepBackward, FaStepForward, 
  FaHeart, FaPen, FaExclamationTriangle, FaChevronDown, FaTimes, FaCheck 
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; 
import './Part1Detail.scss';

// --- DỮ LIỆU GIẢ LẬP 6 CÂU HỎI ---
const MOCK_QUESTIONS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80",
    correctAnswer: "B",
    options: [
      { key: "A", eng: "He's carrying a bag.", vie: "Anh ấy đang mang một chiếc cặp." },
      { key: "B", eng: "He's drawing a map.", vie: "Anh ấy đang vẽ một bản đồ." },
      { key: "C", eng: "He's setting up a lamp.", vie: "Anh ấy đang lắp một chiếc đèn." },
      { key: "D", eng: "He's closing a door.", vie: "Anh ấy đang đóng một cánh cửa." }
    ]
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80", // Ảnh khác
    correctAnswer: "A",
    options: [
      { key: "A", eng: "They are sitting around a table.", vie: "Họ đang ngồi quanh bàn." },
      { key: "B", eng: "They are cooking lunch.", vie: "Họ đang nấu bữa trưa." },
      { key: "C", eng: "They are watching TV.", vie: "Họ đang xem TV." },
      { key: "D", eng: "They are standing in a line.", vie: "Họ đang đứng thành hàng." }
    ]
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80", 
    correctAnswer: "C",
    options: [
      { key: "A", eng: "She is buying a car.", vie: "Cô ấy đang mua xe hơi." },
      { key: "B", eng: "She is holding a pen.", vie: "Cô ấy đang cầm cây bút." },
      { key: "C", eng: "She is paying at the counter.", vie: "Cô ấy đang thanh toán tại quầy." },
      { key: "D", eng: "She is looking at the ceiling.", vie: "Cô ấy đang nhìn lên trần nhà." }
    ]
  },
  // ... Bạn có thể copy thêm cho đủ 6 câu
  { id: 4, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000", correctAnswer: "D", options: [{key:"A", eng:"...", vie:"..."},{key:"B", eng:"...", vie:"..."},{key:"C", eng:"...", vie:"..."},{key:"D", eng:"...", vie:"..."}] },
  { id: 5, img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000", correctAnswer: "A", options: [{key:"A", eng:"...", vie:"..."},{key:"B", eng:"...", vie:"..."},{key:"C", eng:"...", vie:"..."},{key:"D", eng:"...", vie:"..."}] },
  { id: 6, img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1000", correctAnswer: "B", options: [{key:"A", eng:"...", vie:"..."},{key:"B", eng:"...", vie:"..."},{key:"C", eng:"...", vie:"..."},{key:"D", eng:"...", vie:"..."}] },
];

const Part1Detail = () => {
  const { id } = useParams(); 
  
  // State quản lý câu hỏi hiện tại (bắt đầu từ 0)
  const [currentQIdx, setCurrentQIdx] = useState(0);
  
  // State lưu đáp án người dùng đã chọn: { 0: 'A', 1: 'C', ... }
  const [userAnswers, setUserAnswers] = useState({}); 

  const [isPlaying, setIsPlaying] = useState(false);

  // Lấy dữ liệu câu hỏi hiện tại
  const currentQuestion = MOCK_QUESTIONS[currentQIdx];
  // Lấy đáp án người dùng đã chọn cho câu này (nếu có)
  const currentSelected = userAnswers[currentQIdx];

  // Hàm chọn đáp án
  const handleSelect = (optionKey) => {
    // Chỉ lưu nếu chưa chọn (hoặc cho phép chọn lại tùy bạn)
    setUserAnswers(prev => ({
        ...prev,
        [currentQIdx]: optionKey
    }));
  };

  // Hàm chuyển câu tiếp theo
  const handleNext = () => {
    if (currentQIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    }
  };

  // Hàm quay lại câu trước
  const handlePrev = () => {
    if (currentQIdx > 0) {
      setCurrentQIdx(prev => prev - 1);
    }
  };

  return (
    <div className="quiz-page">
      {/* --- HEADER --- */}
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/toeic/part1" className="back-icon"><FaArrowLeft /></Link>
          <span className="question-title">
             {/* Hiển thị số câu: Ví dụ Question 1/6 */}
             Photographs {String(id).padStart(2,'0')} - Question {currentQIdx + 1}/{MOCK_QUESTIONS.length}
          </span>
        </div>
        <div className="header-right">
          <div className="timer">
            <FaClock /> <span>05:12</span>
          </div>
          <FaCog className="icon-btn" title="Cài đặt" />
          <FaListUl className="icon-btn" title="Danh sách câu hỏi" />
          <span className="sidebar-toggle">Ẩn Sidebar</span>
        </div>
      </header>

      {/* --- BODY --- */}
      <div className="quiz-body">
        
        {/* Cột 1: Ảnh (Thay đổi theo câu hỏi) */}
        <div className="column-image">
          <div className="panel-header green-header">
            <span>Question Image</span>
            <FaChevronDown />
          </div>
          <div className="image-wrapper">
             <img 
              src={currentQuestion.img} 
              alt={`Question ${currentQuestion.id}`} 
            />
          </div>
        </div>

        {/* Cột 2: Câu hỏi & Đáp án */}
        <div className="column-question">
          <div className="panel-header blue-header">
            <span>{currentQIdx + 1}.</span>
            <FaChevronDown />
          </div>
          
          <div className="answers-list">
            {currentQuestion.options.map((opt) => {
               // Logic kiểm tra đúng sai
               let itemClass = "answer-item";
               const isSelected = currentSelected === opt.key;
               const isCorrect = opt.key === currentQuestion.correctAnswer;

               if (isSelected) {
                   if (isCorrect) itemClass += " selected-correct"; // Chọn đúng
                   else itemClass += " selected-wrong"; // Chọn sai
               } else if (currentSelected && isCorrect) {
                   // Nếu người dùng đã chọn (dù đúng hay sai) thì hiển thị đáp án đúng lên
                   itemClass += " show-correct-hint"; 
               }

               return (
                <div key={opt.key} className={itemClass} onClick={() => handleSelect(opt.key)}>
                  <div className={`radio-circle`}>
                     {isSelected && <div className="dot"></div>}
                  </div>
                  <div className="answer-text">
                    <div className="eng-text">{opt.key}. {opt.eng}</div>
                    <div className="vie-text">{opt.vie}</div>
                  </div>
                  
                  {isSelected && !isCorrect && <FaTimes className="status-icon wrong" />}
                  {(isSelected && isCorrect) && <FaCheck className="status-icon correct" />}
                </div>
               );
            })}
          </div>
        </div>

        {/* Cột 3: Sidebar */}
        <div className="column-sidebar">
           <div className="sidebar-buttons">
              <button className="btn-outline">Cài đặt</button>
              <button className="btn-fill">Bảng câu hỏi</button>
           </div>
           <div className="comment-box">
              <div className="panel-header purple-header">
                <span>Bình luận chung</span>
                <FaChevronDown />
              </div>
              <div className="comment-content">
                  <p>Bình luận cho câu {currentQIdx + 1}...</p>
              </div>
           </div>
        </div>
      </div>

      {/* --- FOOTER: NAVIGATE --- */}
      <footer className="quiz-footer">
         <div className="audio-row-top">
            <div className="audio-controls">
               <FaUndo className="control-small" />
               <button className="btn-play" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay style={{marginLeft: '2px'}}/>}
               </button>
               <FaRedo className="control-small" />
            </div>
            <div className="audio-progress">
               <input type="range" min="0" max="100" defaultValue="30" />
               <span className="time-tag">00:18</span>
            </div>
            <div className="speed-text">1x</div>
         </div>

         <div className="audio-row-bottom">
            {/* NÚT BACK (disable nếu đang ở câu 1) */}
            <button 
                className="nav-arrow" 
                onClick={handlePrev} 
                disabled={currentQIdx === 0}
                style={{ opacity: currentQIdx === 0 ? 0.3 : 1 }}
            >
                <FaStepBackward />
            </button>
            
            <div className="center-icons">
               <FaHeart />
               <FaPen />
               <FaExclamationTriangle />
            </div>

            {/* NÚT NEXT (disable nếu đang ở câu cuối) */}
            <button 
                className="nav-arrow" 
                onClick={handleNext}
                disabled={currentQIdx === MOCK_QUESTIONS.length - 1}
                style={{ opacity: currentQIdx === MOCK_QUESTIONS.length - 1 ? 0.3 : 1 }}
            >
                <FaStepForward />
            </button>
         </div>
      </footer>
    </div>
  );
};

export default Part1Detail;