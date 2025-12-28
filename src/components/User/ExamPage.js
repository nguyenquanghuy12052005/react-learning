import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Clock, BookOpen, Play, Loader, AlertCircle 
} from 'lucide-react'; 
import { useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from "framer-motion"; 

import './ExamPage.scss'; 
import { getAllQuiz } from '../../services/quizService'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const ExamPage = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // === STATE MỚI: Part đang được chọn ===
  const [selectedPart, setSelectedPart] = useState(null); // null = hiển thị tất cả

  // === FETCH DATA ===
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        console.log("Đang gọi API getAllQuiz...");
        const response = await getAllQuiz();
        console.log("Dữ liệu API trả về:", response);
        
        let realData = [];
        
        if (response && response.DT) { 
            realData = response.DT;
        } else if (response && response.data) {
            realData = response.data;
        } else if (Array.isArray(response)) {
            realData = response;
        }

        if (Array.isArray(realData)) {
            setExams(realData);
        } else {
            console.error("Dữ liệu không đúng định dạng mảng:", response);
            setExams([]); 
        }

      } catch (err) {
        console.error("Lỗi tải danh sách đề thi:", err);
        setError("Không thể kết nối đến máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // === TÍNH TOÁN SỐ LƯỢNG BÀI THI CHO MỖI PART ===
  const partStats = [0, 1, 2, 3, 4, 5, 6, 7].map(partNum => ({
    part: partNum,
    count: exams.filter(exam => exam.part === partNum).length
  }));

  // === FILTER EXAMS THEO PART ===
  const filteredExams = selectedPart === null 
    ? exams 
    : exams.filter(exam => exam.part === selectedPart);

  // === HÀM CHUYỂN TRANG THEO PART ===
  const handleStartExam = (quiz) => {
      const quizId = quiz.id || quiz._id;
      const part = quiz.part || 0;

      console.log("Click làm bài:", { quizId, part, quiz });

      if (!quizId) {
          alert("Lỗi dữ liệu: Bài thi này bị thiếu ID!");
          return;
      }

      switch(part) {
          case 0:
              navigate(`/test-full/${quizId}`);
              break;
          case 1:
              navigate(`/test-part1/${quizId}`);
              break;
          case 2:
              navigate(`/test-part2/${quizId}`);
              break;
          case 3:
              navigate(`/test-part3/${quizId}`);
              break;
          case 4:
              navigate(`/test-part4/${quizId}`);
              break;
          case 5:
              navigate(`/test-part5/${quizId}`);
              break;
          case 6:
              navigate(`/test-part6/${quizId}`);
              break;
          case 7:
              navigate(`/test-part7/${quizId}`);
              break;
          default:
              alert(`Part ${part} chưa được hỗ trợ!`);
      }
  };

  // === RENDER CARD ===
  const renderExamCard = (exam, index) => {
    const keyId = exam.id || exam._id || index;
    const title = exam.name || exam.title || `Đề thi số ${index + 1}`;
    const duration = exam.timeLimit || exam.duration || 120; 
    const questionCount = exam.totalQuestions || (exam.questions ? exam.questions.length : "??");
    const part = exam.part || 0;
    
    const level = exam.level || (["Dễ", "Trung bình", "Khó"][index % 3]);
    const isHot = index < 2;

    const partLabel = part === 0 ? "Full Test" : `Part ${part}`;

    return (
      <motion.div 
        key={keyId} 
        variants={itemVariants}
        className="exam-card"
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
        layout
      >
        <div className="card-tags">
           {isHot && <span className="tag red">Hot</span>}
           <span className="tag blue">{partLabel}</span>
        </div>

        <div className="card-top">
          <div className={`level-badge ${level === "Khó" || level === "Hard" ? "hard" : level === "Trung bình" || level === "Medium" ? "medium" : "easy"}`}>
            <BarChart2 size={14} />
            {level}
          </div>
          <span className="participants">👥 {1200 + index * 45}</span>
        </div>

        <h3 className="exam-title">{title}</h3>

        <div className="exam-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{duration} phút</span>
          </div>
          <div className="meta-item">
            <BookOpen size={16} />
            <span>{questionCount} câu</span>
          </div>
        </div>

        <button className="start-btn" onClick={() => handleStartExam(exam)}>
            <span>Làm bài ngay</span>
            <div className="icon-circle">
                <Play size={14} fill="currentColor" />
            </div>
        </button>
      </motion.div>
    );
  };

  // === RENDER SIDEBAR PART ===
  const renderPartButton = (partNum) => {
    const stat = partStats.find(s => s.part === partNum);
    const count = stat ? stat.count : 0;
    const isActive = selectedPart === partNum;
    const partLabel = partNum === 0 ? "Full Test" : `Part ${partNum}`;

    return (
      <button
        key={partNum}
        className={`part-btn ${isActive ? 'active' : ''}`}
        onClick={() => setSelectedPart(partNum)}
      >
        <span className="part-label">{partLabel}</span>
        <div className="part-stats">
          <span className="badge-count">{count}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="exam-page-container">
      {/* SIDEBAR */}
      <aside className="exam-sidebar">
        <div className="sidebar-header">
          <h3>DANH SÁCH PHẦN</h3>
        </div>

        <div className="sidebar-content">
          {/* Nút "Tất cả" */}
          <button
            className={`part-btn all-btn ${selectedPart === null ? 'active' : ''}`}
            onClick={() => setSelectedPart(null)}
          >
            <span className="part-label">🎯 Tất cả</span>
            <span className="badge-count">{exams.length}</span>
          </button>

          {/* Danh sách Part */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(partNum => renderPartButton(partNum))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="exam-main-content">
        <div className="exam-header">
          <div className="header-info">
            <h1>Thư viện đề thi TOEIC</h1>
            <p>
              {selectedPart === null 
                ? `Tất cả bài thi (${exams.length})` 
                : `${selectedPart === 0 ? 'Full Test' : `Part ${selectedPart}`} (${filteredExams.length} bài)`
              }
            </p>
          </div>
        </div>

        {loading && (
           <div className="state-container loading" style={{padding: 50, textAlign: 'center'}}>
              <Loader className="animate-spin" size={32} /> 
              <p>Đang tải dữ liệu...</p>
           </div>
        )}

        {!loading && error && (
            <div className="state-container error" style={{color: 'red', textAlign: 'center', padding: 50}}>
                <AlertCircle size={32} />
                <p>{error}</p>
            </div>
        )}

        {!loading && !error && filteredExams.length === 0 && (
            <div className="state-container" style={{textAlign: 'center', padding: 50}}>
                <AlertCircle size={32} className="text-muted" />
                <p className="text-muted mt-3">Chưa có bài thi nào cho phần này</p>
            </div>
        )}

        {!loading && !error && filteredExams.length > 0 && (
            <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedPart} // Key này quan trọng để animation chạy khi đổi part
                  className="exam-list"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                    {filteredExams.map((exam, index) => renderExamCard(exam, index))}
                </motion.div>
            </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default ExamPage;