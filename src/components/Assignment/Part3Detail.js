import React, { useState } from 'react';
import { 
  FaArrowLeft, FaClock, FaCog, FaListUl, 
  FaPlay, FaPause, FaUndo, FaRedo, FaStepBackward, FaStepForward, 
  FaHeart, FaPen, FaExclamationTriangle, FaChevronDown 
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; 
import './Part3Detail.scss'; 

// --- HÀM TẠO DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
// Part 3 TOEIC chuẩn: 13 đoạn hội thoại (Conversations), mỗi đoạn 3 câu.
// Tổng cộng từ câu 32 đến câu 70.
const generateMockData = () => {
  const data = [];
  let currentQuestionId = 32; 

  for (let i = 1; i <= 13; i++) {
    const questions = [];
    // Mỗi hội thoại có 3 câu hỏi
    for (let j = 0; j < 3; j++) {
      questions.push({
        qId: currentQuestionId,
        text: `Question ${currentQuestionId}: What does the speaker implies?`, // Text mẫu
        options: [
          { key: "A", text: `Option A for question ${currentQuestionId}` },
          { key: "B", text: `Option B for question ${currentQuestionId}` },
          { key: "C", text: `Option C for question ${currentQuestionId}` },
          { key: "D", text: `Option D for question ${currentQuestionId}` }
        ],
        // Random đáp án đúng để test
        correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)] 
      });
      currentQuestionId++;
    }

    data.push({
      id: i, // ID của đoạn hội thoại
      questions: questions
    });
  }
  return data;
};

// Khởi tạo dữ liệu
const MOCK_DATA_PART3 = generateMockData();

const Part3Detail = () => {
  const { id } = useParams();
  
  // State: Đang ở đoạn hội thoại nào (0 đến 12)
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0);
  
  // State: Lưu đáp án người dùng { 32: 'A', 33: 'C' ... }
  const [userAnswers, setUserAnswers] = useState({}); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Lấy dữ liệu của nhóm hiện tại
  const currentConversation = MOCK_DATA_PART3[currentGroupIdx];

  // Hàm chọn đáp án
  const handleSelect = (qId, key) => {
    setUserAnswers(prev => ({ ...prev, [qId]: key }));
  };

  // Chuyển nhóm tiếp theo
  const handleNext = () => {
    if (currentGroupIdx < MOCK_DATA_PART3.length - 1) {
        setCurrentGroupIdx(prev => prev + 1);
        // Reset scroll lên đầu khi qua trang mới (tùy chọn)
        document.querySelector('.quiz-body')?.scrollTo(0, 0);
    }
  };
  
  // Quay lại nhóm trước
  const handlePrev = () => {
    if (currentGroupIdx > 0) {
        setCurrentGroupIdx(prev => prev - 1);
        document.querySelector('.quiz-body')?.scrollTo(0, 0);
    }
  };

  return (
    <div className="part3-detail-page">
      {/* HEADER */}
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/toeic/part3" className="back-icon"><FaArrowLeft /></Link>
          <span className="question-title">
             {/* Hiển thị số câu: Ví dụ Questions 32-34 */}
             Short Conversations {String(id).padStart(2,'0')} : Questions {currentConversation.questions[0].qId}-{currentConversation.questions[2].qId}
          </span>
        </div>
        <div className="header-right">
          <div className="timer">
            <FaClock /> <span>38:47</span>
          </div>
          <FaCog className="icon-btn" />
          <FaListUl className="icon-btn" />
          <span className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? "Ẩn Sidebar" : "Hiện Sidebar"}
          </span>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="quiz-body">
        
        {/* VÙNG CHỨA CÁC CÂU HỎI */}
        <div className="questions-container">
           {/* Loop qua 3 câu hỏi của nhóm hiện tại */}
           {currentConversation.questions.map((q) => (
             <div key={q.qId} className="question-block">
                {/* Header màu xanh dương */}
                <div className="question-header">
                    <span>{q.qId}. {q.text}</span>
                    <FaChevronDown />
                </div>
                
                {/* Danh sách đáp án */}
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
                                <span className="opt-text">
                                    <b>{opt.key}.</b> {opt.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
             </div>
           ))}
        </div>

        {/* Sidebar (Nếu bật) */}
        {showSidebar && (
            <div className="column-sidebar">
                <div style={{padding:'15px', borderBottom:'1px solid #eee', fontWeight:'bold'}}>Danh sách câu hỏi</div>
                <div style={{padding:'15px', display:'flex', flexWrap:'wrap', gap:'5px'}}>
                    {/* Tạo list số câu hỏi để jump nhanh */}
                    {Array.from({length: 39}, (_, i) => i + 32).map(num => (
                        <div key={num} style={{
                            width:'30px', height:'30px', border:'1px solid #ddd', 
                            display:'flex', alignItems:'center', justifyContent:'center',
                            borderRadius:'4px', fontSize:'0.8rem',
                            background: userAnswers[num] ? '#0096fa' : 'white',
                            color: userAnswers[num] ? 'white' : '#333'
                        }}>
                            {num}
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* FOOTER AUDIO */}
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
               <span className="time-tag">00:00</span>
            </div>
            <div className="speed-text">1x</div>
         </div>

         <div className="audio-row-bottom">
            <button className="nav-arrow" onClick={handlePrev} disabled={currentGroupIdx===0}>
                <FaStepBackward />
            </button>
            
            <div className="center-icons">
               <FaHeart /> <FaPen /> <FaExclamationTriangle />
            </div>
            
            <button className="nav-arrow" onClick={handleNext} disabled={currentGroupIdx===MOCK_DATA_PART3.length-1}>
                <FaStepForward />
            </button>
         </div>
      </footer>
    </div>
  );
};

export default Part3Detail;