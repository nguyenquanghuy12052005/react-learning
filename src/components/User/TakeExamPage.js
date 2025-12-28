import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExam.scss';

// Cấu trúc Part chuẩn TOEIC
const EXAM_STRUCTURE = [
    { part: 1, name: "Part 1: Photographs", start: 0, end: 6 },
    { part: 2, name: "Part 2: Q&A", start: 6, end: 31 },
    { part: 3, name: "Part 3: Conversations", start: 31, end: 70 },
    { part: 4, name: "Part 4: Short Talks", start: 70, end: 100 },
    { part: 5, name: "Part 5: Incomplete Sentences", start: 100, end: 130 },
    { part: 6, name: "Part 6: Text Completion", start: 130, end: 146 },
    { part: 7, name: "Part 7: Reading Comprehension", start: 146, end: 200 }
];

const TakeExamPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [quizData, setQuizData] = useState(null);
    const [parts, setParts] = useState([]);
    const [activePart, setActivePart] = useState(1);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // === FETCH DATA ===
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                
                // Xử lý response từ axios wrapper
                let data = response?.data || response;
                if (data?.DT) data = data.DT;
                
                console.log("📦 Quiz Data từ Backend:", data);

                if (!data || !data.questions || !Array.isArray(data.questions)) {
                    throw new Error("Dữ liệu quiz không hợp lệ");
                }

                setQuizData(data);
                setTimeLeft((data.timeLimit || 120) * 60);

                // === CHIA QUESTIONS VÀO PARTS ===
                const allQuestions = data.questions;
                console.log(`✅ Tổng số câu: ${allQuestions.length}`);

                const processedParts = EXAM_STRUCTURE.map(struct => {
                    const partQuestions = allQuestions
                        .slice(struct.start, struct.end)
                        .map((q, idx) => {
                            // Chuẩn hóa questionText
                            let textArray = [];
                            if (Array.isArray(q.questionText)) {
                                textArray = q.questionText;
                            } else if (q.questionText) {
                                textArray = [q.questionText];
                            }

                            // Xác định passage và question text riêng biệt
                            let passage = "";
                            let questionContent = "";

                            if (struct.part === 6 || struct.part === 7) {
                                // Part 6,7: Tách passage và câu hỏi
                                if (textArray.length > 1) {
                                    passage = textArray.slice(0, -1).join("\n\n");
                                    questionContent = textArray[textArray.length - 1];
                                } else {
                                    questionContent = textArray[0] || "";
                                }
                            } else {
                                // Part 1-5: Lấy tất cả làm questionContent
                                questionContent = textArray.join(" ");
                            }

                            return {
                                _id: q._id,
                                displayNum: struct.start + idx + 1,
                                passage: passage,
                                questionText: questionContent,
                                questionImage: q.questionImage || "",
                                questionAudio: q.questionAudio || "",
                                options: q.options || [],
                                correctAnswer: q.correctAnswer || "",
                                explanation: q.explanation || "",
                                point: q.point || 1
                            };
                        });

                    return {
                        ...struct,
                        data: partQuestions
                    };
                });

                setParts(processedParts);
                
                // Tự động chọn part đầu có câu hỏi
                const firstAvailable = processedParts.find(p => p.data.length > 0);
                if (firstAvailable) setActivePart(firstAvailable.part);

            } catch (err) {
                console.error("❌ Lỗi fetch quiz:", err);
                setError(err.message || "Không thể tải đề thi");
            } finally {
                setLoading(false);
            }
        };
        
        fetchQuiz();
    }, [id]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    // === HANDLE ANSWER ===
    const handleSelect = (questionId, value) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    // === SUBMIT ===
    const handleSubmit = useCallback(async () => {
        const totalQuestions = parts.reduce((sum, p) => sum + p.data.length, 0);
        const answeredCount = Object.keys(userAnswers).length;
        
        if (answeredCount < totalQuestions) {
            const confirm = window.confirm(
                `Bạn mới trả lời ${answeredCount}/${totalQuestions} câu. Bạn có chắc muốn nộp bài?`
            );
            if (!confirm) return;
        }

        try {
            setSubmitting(true);

            // Format answers theo cấu trúc backend yêu cầu
            const answers = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
                questionId,
                selectedOption
            }));

            const submitData = {
                quizId: id,
                answers: answers,
                timeSpent: ((quizData?.timeLimit || 120) * 60) - timeLeft
            };

            console.log("📤 Submitting:", submitData);

            const response = await postSubmitQuiz(submitData);
            
            if (response?.data) {
                const resultId = response.data._id || response.data.id;
                alert(`Nộp bài thành công! Điểm: ${response.data.score}`);
                navigate(`/result/${resultId}`);
            } else {
                throw new Error("Không nhận được kết quả từ server");
            }

        } catch (err) {
            console.error("❌ Lỗi submit:", err);
            alert("Lỗi khi nộp bài: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    }, [parts, userAnswers, id, quizData, timeLeft, navigate]);

    // === TIMER (Phải đặt SAU handleSubmit) ===
    useEffect(() => {
        if (!timeLeft || timeLeft <= 0) return;
        
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit(); // Auto submit khi hết giờ
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timerId);
    }, [timeLeft, handleSubmit]);

    // === RENDER PASSAGE (Part 6, 7) ===
    const renderPassage = (passage) => {
        if (!passage) return null;
        
        return (
            <div className="passage-container p-3 mb-4 bg-light border rounded">
                <div className="passage-text" style={{whiteSpace: 'pre-wrap', lineHeight: '1.8'}}>
                    {passage}
                </div>
            </div>
        );
    };

    // === RENDER QUESTION TEXT ===
    const renderQuestionText = (text) => {
        if (!text) return null;
        
        return (
            <div className="question-text mb-3">
                <p className="mb-0 fw-semibold text-dark" style={{fontSize: '1.05rem'}}>
                    {text}
                </p>
            </div>
        );
    };

    // === RENDER PART CONTENT ===
    const renderPartContent = (part) => {
        if (!part || part.data.length === 0) {
            return <Alert variant="warning">Không có câu hỏi cho phần này.</Alert>;
        }

        // Group questions by passage for Part 6, 7
        let displayGroups = [];
        
        if (part.part === 6 || part.part === 7) {
            let currentPassage = "";
            let currentGroup = [];

            part.data.forEach((q, idx) => {
                if (q.passage !== currentPassage) {
                    if (currentGroup.length > 0) {
                        displayGroups.push({
                            passage: currentPassage,
                            questions: currentGroup
                        });
                    }
                    currentPassage = q.passage;
                    currentGroup = [q];
                } else {
                    currentGroup.push(q);
                }

                // Push group cuối cùng
                if (idx === part.data.length - 1) {
                    displayGroups.push({
                        passage: currentPassage,
                        questions: currentGroup
                    });
                }
            });
        } else {
            // Part 1-5: Không group
            displayGroups = [{
                passage: null,
                questions: part.data
            }];
        }

        return (
            <div className="part-container">
                {displayGroups.map((group, gIdx) => (
                    <div key={gIdx} className="question-group mb-5">
                        {/* Hiển thị Passage nếu có */}
                        {group.passage && renderPassage(group.passage)}

                        {/* Hiển thị các câu hỏi */}
                        {group.questions.map((q) => {
                            const isSelected = !!userAnswers[q._id];

                            return (
                                <div 
                                    key={q._id}
                                    className="question-card mb-4 p-4 bg-white border rounded shadow-sm"
                                >
                                    {/* Header */}
                                    <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                                        <Badge bg="primary" className="fs-6">
                                            Question {q.displayNum}
                                        </Badge>
                                        {isSelected && (
                                            <Badge bg="success">
                                                <FaCheckCircle className="me-1"/> {userAnswers[q._id]}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Image (Part 1) */}
                                    {q.questionImage && (
                                        <div className="text-center mb-3 bg-dark rounded p-3">
                                            <img 
                                                src={q.questionImage}
                                                alt="Question Visual"
                                                className="img-fluid rounded"
                                                style={{maxHeight: '350px', objectFit: 'contain'}}
                                            />
                                        </div>
                                    )}

                                    {/* Audio (Part 1-4) */}
                                    {q.questionAudio && (
                                        <div className="mb-3">
                                            <audio 
                                                controls 
                                                className="w-100"
                                                style={{height: '45px'}}
                                            >
                                                <source src={q.questionAudio} type="audio/mpeg" />
                                                Trình duyệt không hỗ trợ audio
                                            </audio>
                                        </div>
                                    )}

                                    {/* Question Text */}
                                    {q.questionText && renderQuestionText(q.questionText)}

                                    {/* Options */}
                                    <div className="options-container mt-3">
                                        {q.options.map((opt, oIdx) => {
                                            const label = ['A', 'B', 'C', 'D'][oIdx];
                                            if (!label) return null;
                                            
                                            const isChosen = userAnswers[q._id] === label;
                                            
                                            return (
                                                <div 
                                                    key={oIdx}
                                                    className={`option-item p-3 mb-2 border rounded d-flex align-items-center ${
                                                        isChosen ? 'border-primary border-2 bg-primary bg-opacity-10' : 'border-secondary'
                                                    }`}
                                                    onClick={() => handleSelect(q._id, label)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        userSelect: 'none'
                                                    }}
                                                >
                                                    <span 
                                                        className={`opt-label me-3 px-3 py-2 rounded fw-bold ${
                                                            isChosen ? 'bg-primary text-white' : 'bg-light text-dark'
                                                        }`}
                                                        style={{minWidth: '45px', textAlign: 'center'}}
                                                    >
                                                        {label}
                                                    </span>
                                                    <span className="opt-text flex-grow-1">
                                                        {opt.text}
                                                    </span>
                                                    {opt.image && (
                                                        <img 
                                                            src={opt.image}
                                                            alt="Option"
                                                            className="ms-2 rounded"
                                                            style={{height: '40px'}}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    // === LOADING & ERROR ===
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <Spinner animation="border" variant="primary" style={{width: '3rem', height: '3rem'}} />
                <p className="mt-3 fw-bold text-primary">Đang tải đề thi...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="pt-5">
                <Alert variant="danger">
                    <Alert.Heading>❌ Lỗi tải dữ liệu</Alert.Heading>
                    <p>{error}</p>
                    <hr />
                    <Button variant="outline-danger" onClick={() => navigate(-1)}>
                        <FaArrowLeft className="me-1"/> Quay lại
                    </Button>
                </Alert>
            </Container>
        );
    }

    const activePartData = parts.find(p => p.part === activePart);
    const totalQuestions = parts.reduce((sum, p) => sum + p.data.length, 0);
    const answeredCount = Object.keys(userAnswers).length;

    return (
        <Container fluid className="exam-wrapper px-0 bg-light" style={{minHeight: '100vh'}}>
            {/* Header Sticky */}
            <div className="exam-header sticky-top bg-white shadow-sm px-4 py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => {
                                if (window.confirm("Bạn có chắc muốn thoát? Dữ liệu sẽ không được lưu.")) {
                                    navigate(-1);
                                }
                            }}
                        >
                            <FaArrowLeft className="me-1"/> Thoát
                        </Button>
                        <h5 className="m-0 fw-bold text-primary">
                            {quizData?.title || "TOEIC TEST"}
                        </h5>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3">
                        <div 
                            className={`timer-box fw-bold border px-3 py-2 rounded-pill ${
                                timeLeft < 300 ? 'bg-danger text-white border-danger' : 'bg-light text-danger border-danger'
                            }`}
                        >
                            <FaClock className="me-2"/> 
                            {formatTime(timeLeft)}
                        </div>
                        <Badge bg="secondary" className="fs-6 py-2 px-3">
                            {answeredCount}/{totalQuestions}
                        </Badge>
                        <Button 
                            variant="success"
                            className="fw-bold"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? 'Đang nộp...' : 'NỘP BÀI'}
                        </Button>
                    </div>
                </div>
            </div>

            <Row className="g-0">
                {/* Sidebar */}
                <Col md={2} className="d-none d-md-block bg-white border-end" style={{minHeight: 'calc(100vh - 80px)'}}>
                    <div 
                        className="sidebar-nav sticky-top p-2"
                        style={{top: '80px', maxHeight: '90vh', overflowY: 'auto'}}
                    >
                        <h6 className="p-3 m-0 bg-light rounded text-center fw-bold border-bottom">
                            DANH SÁCH PHẦN
                        </h6>
                        <Nav className="flex-column mt-2">
                            {parts.map(p => {
                                const answeredInPart = p.data.filter(q => userAnswers[q._id]).length;
                                
                                return (
                                    <Nav.Link 
                                        key={p.part}
                                        active={activePart === p.part}
                                        onClick={() => setActivePart(p.part)}
                                        className="d-flex justify-content-between align-items-center py-3 border-bottom rounded mb-1"
                                        disabled={p.data.length === 0}
                                        style={{fontSize: '0.9rem'}}
                                    >
                                        <span className="fw-bold">Part {p.part}</span>
                                        <div className="d-flex gap-1">
                                            <Badge bg="secondary">{p.data.length}</Badge>
                                            <Badge bg="success">{answeredInPart}</Badge>
                                        </div>
                                    </Nav.Link>
                                );
                            })}
                        </Nav>
                    </div>
                </Col>

                {/* Main Content */}
                <Col md={10} className="p-4">
                    {activePartData && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                <h4 className="text-primary fw-bold m-0">
                                    {activePartData.name}
                                </h4>
                                <span className="text-muted">
                                    {activePartData.data.filter(q => userAnswers[q._id]).length}/{activePartData.data.length} câu
                                </span>
                            </div>
                            {renderPartContent(activePartData)}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TakeExamPage;