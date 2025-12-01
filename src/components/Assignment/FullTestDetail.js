import React, { useState } from 'react';
import { 
  FaArrowLeft, FaClock, FaListUl, 
  FaStepBackward, FaStepForward 
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; 
import { motion, AnimatePresence } from "framer-motion"; 
import './FullTestDetail.scss'; 

// --- 1. HÀM SINH DỮ LIỆU MOCK CHUẨN TOEIC (200 CÂU) ---
const generateFullTest = () => {
  const slides = [];
  
  // --- PART 1: 6 Câu (Q1 - Q6) ---
  for (let i = 1; i <= 6; i++) {
    slides.push({
      type: 'part1', partName: 'Part 1: Photographs',
      qId: i,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
      questions: [{ qId: i, text: "Select the best description.", options: ["A", "B", "C", "D"] }]
    });
  }

  // --- PART 2: 25 Câu (Q7 - Q31) ---
  for (let i = 7; i <= 31; i++) {
    slides.push({
      type: 'part2', partName: 'Part 2: Q & R',
      qId: i,
      questions: [{ qId: i, text: "Listen and choose the best response.", options: ["A", "B", "C"] }]
    });
  }

  // --- PART 3: 39 Câu (Q32 - Q70) | 13 Đoạn x 3 Câu ---
  for (let i = 32; i <= 70; i += 3) {
    slides.push({
      type: 'part3', partName: 'Part 3: Conversations',
      questions: [0, 1, 2].map(offset => ({
        qId: i + offset, text: `Question ${i+offset}: What does the man imply?`, options: ["A", "B", "C", "D"]
      }))
    });
  }

  // --- PART 4: 30 Câu (Q71 - Q100) | 10 Đoạn x 3 Câu ---
  for (let i = 71; i <= 100; i += 3) {
    const hasGraphic = i >= 95; // 2 đoạn cuối thường có hình
    slides.push({
      type: 'part4', partName: 'Part 4: Short Talks',
      graphic: hasGraphic ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" : null,
      questions: [0, 1, 2].map(offset => ({
        qId: i + offset, text: `Question ${i+offset}: What is the speaker discussing?`, options: ["A", "B", "C", "D"]
      }))
    });
  }

  // --- PART 5: 30 Câu (Q101 - Q130) ---
  for (let i = 101; i <= 130; i++) {
    slides.push({
      type: 'part5', partName: 'Part 5: Incomplete Sentences',
      qId: i,
      questions: [{ qId: i, text: `Question ${i}: The manager ______ the report yesterday.`, options: ["submitted", "submit", "submission", "submitting"] }]
    });
  }

  // --- PART 6: 16 Câu (Q131 - Q146) | 4 Đoạn x 4 Câu ---
  for (let i = 131; i <= 146; i += 4) {
    slides.push({
      type: 'part6', partName: 'Part 6: Text Completion',
      passageTitle: "Memorandum / Email",
      passageContent: `<p><strong>To:</strong> All Staff<br/>This is a mock passage for questions ${i}-${i+3}. Please select the best word to fill in the blanks.</p><p>We appreciate your cooperation.</p>`,
      questions: [0, 1, 2, 3].map(offset => ({ qId: i + offset, text: `Question ${i+offset}: Select best answer.`, options: ["A", "B", "C", "D"] }))
    });
  }

  // --- PART 7: 54 Câu (Q147 - Q200) ---
  
  // 1. Single Passages (Q147 - Q175 = 29 câu)
  // Cấu trúc giả lập: 10 đoạn văn, số lượng câu hỏi biến thiên: 2, 2, 2, 2, 3, 3, 3, 4, 4, 4
  const singlePatterns = [2, 2, 2, 2, 3, 3, 3, 4, 4, 4]; 
  let currentP7 = 147;
  
  singlePatterns.forEach((count) => {
    const qList = [];
    for (let k = 0; k < count; k++) {
        qList.push({ qId: currentP7 + k, text: `Question ${currentP7+k}: What is indicated about...?`, options: ["A","B","C","D"] });
    }
    slides.push({
        type: 'part7', partName: 'Part 7: Single Passage',
        passageTitle: "Advertisement / Notice",
        passageContent: `<h3>Reading Text Q${currentP7}-${currentP7+count-1}</h3><p>This is a single passage. Please answer the questions below.</p>`,
        questions: qList
    });
    currentP7 += count;
  });

  // 2. Double Passages (Q176 - Q185 = 10 câu) | 2 Đoạn x 5 Câu
  for (let i = 0; i < 2; i++) {
    const qList = [];
    for (let k = 0; k < 5; k++) {
        qList.push({ qId: currentP7 + k, text: `Question ${currentP7+k}: What is true about both documents?`, options: ["A","B","C","D"] });
    }
    slides.push({
        type: 'part7', partName: 'Part 7: Double Passage',
        passageTitle: "Email & Schedule",
        passageContent: `
            <div class='doc-1'><strong>Document 1: Email</strong><br/><p>Dear Mr. Smith, regarding the schedule...</p></div>
            <hr/>
            <div class='doc-2'><strong>Document 2: Schedule</strong><br/><p>9:00 AM: Opening Ceremony...</p></div>
        `,
        questions: qList
    });
    currentP7 += 5;
  }

  // 3. Triple Passages (Q186 - Q200 = 15 câu) | 3 Đoạn x 5 Câu
  for (let i = 0; i < 3; i++) {
    const qList = [];
    for (let k = 0; k < 5; k++) {
        qList.push({ qId: currentP7 + k, text: `Question ${currentP7+k}: What does the woman imply?`, options: ["A","B","C","D"] });
    }
    slides.push({
        type: 'part7', partName: 'Part 7: Triple Passage',
        passageTitle: "Notice, Email & Review",
        passageContent: `
            <div class='doc-1'><strong>Doc 1: Notice</strong><br/><p>Store opening hours update...</p></div>
            <hr/>
            <div class='doc-2'><strong>Doc 2: Email</strong><br/><p>I saw the notice and I have a question...</p></div>
            <hr/>
            <div class='doc-3'><strong>Doc 3: Online Review</strong><br/><p>Great service despite the hour changes!</p></div>
        `,
        questions: qList
    });
    currentP7 += 5;
  }

  return slides;
};

const TEST_DATA = generateFullTest();

// Config Animation
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 })
};

const FullTestDetail = () => {
  const { id } = useParams();
  const [[currentSlideIdx, direction], setPage] = useState([0, 0]); 
  const [userAnswers, setUserAnswers] = useState({}); 
  const [showSidebar, setShowSidebar] = useState(false);
  
  const currentSlide = TEST_DATA[currentSlideIdx];

  // Chốt an toàn
  if (!currentSlide) return <div style={{padding: 50, textAlign:'center'}}>Loading Test Data...</div>;

  const paginate = (newDirection) => {
    const nextIndex = currentSlideIdx + newDirection;
    if (nextIndex >= 0 && nextIndex < TEST_DATA.length) {
      setPage([nextIndex, newDirection]);
    }
  };

  const handleSelect = (qId, key) => {
    setUserAnswers(prev => ({ ...prev, [qId]: key }));
  };

  // 1. Render Card Đơn (Part 1, 2, 5)
  const renderSingleQuestionCard = (q) => (
    <div className="question-card-single">
        <div className="panel-header blue-header"><span>{q.qId}. {q.text}</span></div>
        <div className="options-list">
            {q.options.map(opt => {
                const isSelected = userAnswers[q.qId] === opt;
                return (
                    <div key={opt} className={`option-item ${isSelected?'selected':''}`} onClick={() => handleSelect(q.qId, opt)}>
                        <div className="radio-circle">{isSelected && <div className="dot"></div>}</div>
                        <span className="opt-text">{opt}</span>
                    </div>
                )
            })}
        </div>
    </div>
  );

  // 2. Render Card Nhóm (Part 3, 4, 6, 7) - Card này sẽ cuộn bên trong
  const renderGroupQuestions = (questions) => (
    <div className="group-card">
        <div className="card-header blue-header">
            Questions {questions[0].qId}-{questions[questions.length-1].qId}
        </div>
        <div className="card-scroll-content">
            {questions.map((q, index) => (
                <div key={q.qId} className="question-item-block">
                    <div className="q-title"><span className="q-num">{q.qId}.</span> {q.text}</div>
                    <div className="options-list">
                        {q.options.map(opt => {
                            const isSelected = userAnswers[q.qId] === opt;
                            return (
                                <div key={opt} className={`option-item ${isSelected?'selected':''}`} onClick={() => handleSelect(q.qId, opt)}>
                                    <div className="radio-circle">{isSelected && <div className="dot"></div>}</div>
                                    <span className="opt-text">{opt}</span>
                                </div>
                            )
                        })}
                    </div>
                    {index < questions.length - 1 && <div className="divider"></div>}
                </div>
            ))}
        </div>
    </div>
  );

  const renderSlideContent = () => {
    const { type, questions, image, graphic, passageContent, passageTitle } = currentSlide;

    // Part 1: Ảnh + 1 Câu
    if (type === 'part1') return (
        <div className="layout-part1">
            <div className="image-box"><div className="panel-header green-header"><span>Photograph</span></div><img src={image} alt="Part 1" /></div>
            <div className="question-box">{renderSingleQuestionCard(questions[0])}</div>
        </div>
    );
    
    // Part 2 & 5: 1 Câu giữa màn hình
    if (type === 'part2' || type === 'part5') return (
        <div className="layout-single-center">{renderSingleQuestionCard(questions[0])}</div>
    );
    
    // Part 3 & 4: Chia đôi (Có thể có Graphic)
    if (type === 'part3' || type === 'part4') return (
        <div className={`layout-split ${graphic ? 'has-graphic' : ''}`}>
            {graphic && (<div className="left-panel"><div className="panel-header green-header"><span>Graphic</span></div><img src={graphic} alt="Graphic" className="graphic-img"/></div>)}
            <div className="right-panel-group">
                {renderGroupQuestions(questions)}
            </div>
        </div>
    );
    
    // Part 6 & 7: Chia đôi (Văn bản + Nhóm câu hỏi)
    if (type === 'part6' || type === 'part7') return (
        <div className="layout-split">
            <div className="left-panel">
                <div className="panel-header green-header"><span>{passageTitle}</span></div>
                <div className="passage-content" dangerouslySetInnerHTML={{__html: passageContent}}></div>
            </div>
            <div className="right-panel-group">
                {renderGroupQuestions(questions)}
            </div>
        </div>
    );
  };

  return (
    <div className="full-test-page">
      <header className="test-header">
        <div className="header-left">
          <Link to="/test-full" className="back-btn"><FaArrowLeft /></Link>
          <span className="test-title">L&R Test {String(id).padStart(2,'0')} - {currentSlide.partName}</span>
        </div>
        <div className="header-right">
          <div className="timer"><FaClock /> <span>01:59:45</span></div>
          <FaListUl className="icon-btn" onClick={() => setShowSidebar(!showSidebar)} />
        </div>
      </header>

      <div className="test-body">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div 
                key={currentSlideIdx} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="slide-container"
            >
                {renderSlideContent()}
            </motion.div>
        </AnimatePresence>

        {showSidebar && (
            <div className="question-palette">
                <div className="palette-grid">
                    {Array.from({length: 200}, (_,i) => i+1).map(num => (
                        <div key={num} className={`p-item ${userAnswers[num] ? 'filled' : ''}`}>{num}</div>
                    ))}
                </div>
            </div>
        )}
      </div>

      <footer className="test-footer">
         <div className="nav-row">
            <button className="nav-btn" onClick={() => paginate(-1)} disabled={currentSlideIdx === 0}><FaStepBackward /> Prev</button>
            
            {/* Thanh điều khiển Audio (chỉ hiện cho Part 1,2,3,4) */}
            <div className="audio-control-placeholder">
                {['part1','part2','part3','part4'].includes(currentSlide.type) && (
                    <span>Audio Playing...</span>
                )}
            </div>

            <button className="nav-btn" onClick={() => paginate(1)} disabled={currentSlideIdx === TEST_DATA.length - 1}>Next <FaStepForward /></button>
         </div>
      </footer>
    </div>
  );
};

export default FullTestDetail;