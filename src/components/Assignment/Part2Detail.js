import React, { useState } from 'react';
import { 
  FaArrowLeft, FaClock, FaCog, FaListUl, 
  FaPlay, FaPause, FaUndo, FaRedo, FaStepBackward, FaStepForward, 
  FaHeart, FaPen, FaExclamationTriangle, FaChevronDown, FaCheck, FaTimes 
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; 
import './Part2Detail.scss'; // Style riêng cho Part 2

// DỮ LIỆU GIẢ LẬP PART 2 (Question & Response)
const MOCK_DATA_PART2 = [
  {
    id: 1, // Question 7 (trong đề thật thường bắt đầu từ câu 7)
    questionNum: 7,
    correctAnswer: "A",
    // Part 2 thường không hiện text, nhưng mình để đây để bạn tùy chỉnh hiển thị
    options: [
      { key: "A", text: "He's in the meeting room." },
      { key: "B", text: "It starts at 9 AM." },
      { key: "C", text: "Yes, I did." }
    ]
  },
  {
    id: 2,
    questionNum: 8,
    correctAnswer: "C",
    options: [
      { key: "A", text: "By bus, I think." },
      { key: "B", text: "It's on the second floor." },
      { key: "C", text: "Mr. Smith is managing it." }
    ]
  },
  // ... Thêm các câu khác
  { id: 3, questionNum: 9, correctAnswer: "B", options: [{key:"A", text:"..."}, {key:"B", text:"..."}, {key:"C", text:"..."}] }
];

const Part2Detail = () => {
  const { id } = useParams();
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Mặc định ẩn sidebar giống ảnh

  const currentQuestion = MOCK_DATA_PART2[currentQIdx];
  const currentSelected = userAnswers[currentQIdx];

  const handleSelect = (key) => {
    setUserAnswers(prev => ({ ...prev, [currentQIdx]: key }));
  };

  const handleNext = () => {
    if (currentQIdx < MOCK_DATA_PART2.length - 1) setCurrentQIdx(prev => prev + 1);
  };
  
  const handlePrev = () => {
    if (currentQIdx > 0) setCurrentQIdx(prev => prev - 1);
  };

  return (
    <div className="part2-detail-page">
      {/* HEADER */}
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/toeic/part2" className="back-icon"><FaArrowLeft /></Link>
          <span className="question-title">
             Question & Response {String(id).padStart(2,'0')} - Question {currentQuestion.questionNum}
          </span>
        </div>
        <div className="header-right">
          <div className="timer">
            <FaClock /> <span>24:52</span>
          </div>
          <FaCog className="icon-btn" />
          <FaListUl className="icon-btn" />
          <span 
            className="sidebar-toggle" 
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Ẩn Sidebar" : "Hiện Sidebar"}
          </span>
        </div>
      </header>

      {/* BODY */}
      <div className="quiz-body">
        {/* Cột Câu hỏi (Chiếm toàn bộ nếu ẩn Sidebar) */}
        <div className="column-question-full">
          <div className="panel-header blue-header">
            <span>{currentQuestion.questionNum}.</span>
            <FaChevronDown />
          </div>
          
          <div className="answers-list">
            {currentQuestion.options.map((opt) => {
               const isSelected = currentSelected === opt.key;
               const isCorrect = opt.key === currentQuestion.correctAnswer;
               
               // Logic class CSS
               let itemClass = "answer-item";
               if (isSelected) {
                   if (isCorrect) itemClass += " selected-correct";
                   else itemClass += " selected-wrong";
               } else if (currentSelected && isCorrect) {
                   itemClass += " show-correct-hint";
               }

               return (
                <div key={opt.key} className={itemClass} onClick={() => handleSelect(opt.key)}>
                  <div className="radio-circle">
                     {isSelected && <div className="dot"></div>}
                  </div>
                  <div className="answer-content">
                    <span className="opt-key">{opt.key}</span>
                    {/* Part 2 thường ẩn text, nếu muốn hiện thì bỏ comment dòng dưới */}
                    {/* <span className="opt-text">{opt.text}</span> */}
                  </div>

                  {isSelected && !isCorrect && <FaTimes className="status-icon wrong" />}
                  {(isSelected && isCorrect) && <FaCheck className="status-icon correct" />}
                </div>
               );
            })}
          </div>
        </div>

        {/* Sidebar (Có thể ẩn/hiện) */}
        {showSidebar && (
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
                <div className="comment-content">...</div>
            </div>
            </div>
        )}
      </div>

      {/* FOOTER PLAYER */}
      <footer className="quiz-footer">
        <div className="audio-row-top">
            <div className="audio-controls">
               <FaUndo className="control-small" />
               <button className="btn-play" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay style={{marginLeft:'2px'}}/>}
               </button>
               <FaRedo className="control-small" />
            </div>
            <div className="audio-progress">
               <input type="range" defaultValue="10" />
               <span className="time-tag">00:06</span>
            </div>
            <div className="speed-text">1x</div>
         </div>

         <div className="audio-row-bottom">
            <button className="nav-arrow" onClick={handlePrev} disabled={currentQIdx===0}><FaStepBackward /></button>
            <div className="center-icons">
               <FaHeart /> <FaPen /> <FaExclamationTriangle />
            </div>
            <button className="nav-arrow" onClick={handleNext} disabled={currentQIdx===MOCK_DATA_PART2.length-1}><FaStepForward /></button>
         </div>
      </footer>
    </div>
  );
};

export default Part2Detail;