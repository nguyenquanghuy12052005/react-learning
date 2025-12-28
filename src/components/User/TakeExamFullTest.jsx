import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card, Badge, Nav, ProgressBar } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp, FaListUl } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss'; // Sử dụng lại CSS của Part 1 để đồng bộ giao diện

// Cấu hình chia câu hỏi cho Full Test (Theo chuẩn TOEIC 200 câu)
const TOEIC_STRUCTURE = [
    { part: 1, label: "Part 1: Photographs", start: 0, end: 6 },
    { part: 2, label: "Part 2: Question-Response", start: 6, end: 31 },
    { part: 3, label: "Part 3: Conversations", start: 31, end: 70 },
    { part: 4, label: "Part 4: Short Talks", start: 70, end: 100 },
    { part: 5, label: "Part 5: Incomplete Sentences", start: 100, end: 130 },
    { part: 6, label: "Part 6: Text Completion", start: 130, end: 146 },
    { part: 7, label: "Part 7: Reading Comprehension", start: 146, end: 200 }
];

const TakeExamFullTest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]); // Chứa toàn bộ 200 câu
    const [userAnswers, setUserAnswers] = useState({});
    const [activePart, setActivePart] = useState(1); // Part đang hiển thị
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // === 1. FETCH DATA ===
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                let data = response?.data || response;
                if (data?.DT) data = data.DT;

                setQuizData(data);
                // Mặc định Full Test là 120 phút nếu không có config
                setTimeLeft((data.timeLimit || 120) * 60);

                // Chuẩn hóa danh sách câu hỏi phẳng
                const processed = (data.questions || []).map((q, i) => ({
                    _id: q._id,
                    globalIndex: i + 1, // Số thứ tự từ 1-200
                    questionText: Array.isArray(q.questionText) ? q.questionText : [q.questionText || ""],
                    questionImage: q.questionImage || "",
                    questionAudio: q.questionAudio || "",
                    options: q.options || [],
                }));
                setAllQuestions(processed);
            } catch (err) {
                alert("Lỗi tải đề: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    // === 2. TÁCH DỮ LIỆU THEO PART ===
    // Mỗi khi allQuestions thay đổi, tự động chia lại vào các Part
    const partsData = useMemo(() => {
        const parts = {};
        TOEIC_STRUCTURE.forEach(struct => {
            parts[struct.part] = allQuestions.slice(struct.start, struct.end);
        });
        return parts;
    }, [allQuestions]);

    // === 3. XỬ LÝ NỘP BÀI ===
    const handleSubmit = useCallback(async () => {
        const answeredCount = Object.keys(userAnswers).length;
        if (answeredCount < allQuestions.length) {
            if (!window.confirm(`Bạn mới làm ${answeredCount}/${allQuestions.length} câu. Chắc chắn nộp?`)) return;
        }

        try {
            setSubmitting(true);
            const answers = Object.entries(userAnswers).map(([k, v]) => ({ questionId: k, selectedOption: v }));
            const res = await postSubmitQuiz({
                quizId: id,
                answers,
                timeSpent: ((quizData?.timeLimit || 120) * 60) - timeLeft
            });
            if (res?.data) {
                navigate(`/result/${res.data._id || res.data.id}`);
            }
        } catch (err) {
            alert("Lỗi nộp bài: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    }, [allQuestions, userAnswers, id, quizData, timeLeft, navigate]);

    // === 4. TIMER ===
    useEffect(() => {
        if (!timeLeft) return;
        const t = setInterval(() => setTimeLeft(p => (p <= 1 ? (handleSubmit(), 0) : p - 1)), 1000);
        return () => clearInterval(t);
    }, [timeLeft, handleSubmit]);

    const handleAnswer = (qId, val) => setUserAnswers(prev => ({ ...prev, [qId]: val }));
    const formatTime = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${h}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border"/></div>;

    // Lấy dữ liệu của Part đang chọn
    const currentQuestions = partsData[activePart] || [];

    return (
        <Container fluid className="take-exam-full bg-light min-vh-100 px-0">
            {/* Header Sticky */}
            <div className="exam-header sticky-top bg-white shadow-sm px-4 py-2 border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <Button variant="outline-dark" size="sm" onClick={() => { if(window.confirm("Thoát?")) navigate(-1) }}>
                        <FaArrowLeft/> Thoát
                    </Button>
                    <div>
                        <h6 className="m-0 fw-bold text-primary">{quizData?.title || "TOEIC Full Test"}</h6>
                        <small className="text-muted">Đang làm: {TOEIC_STRUCTURE.find(p => p.part === activePart)?.label}</small>
                    </div>
                </div>
                
                <div className="d-flex align-items-center gap-3">
                    <div className="timer-box fw-bold text-danger fs-5 border px-3 py-1 rounded">
                        <FaClock className="me-2"/>{formatTime(timeLeft)}
                    </div>
                    <Button variant="success" className="fw-bold px-4" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Đang nộp...' : 'NỘP BÀI'}
                    </Button>
                </div>
            </div>

            <Row className="g-0">
                {/* SIDEBAR ĐIỀU HƯỚNG PART */}
                <Col md={2} className="bg-white border-end d-none d-md-block" style={{height: 'calc(100vh - 70px)', overflowY: 'auto'}}>
                    <div className="p-3">
                        <h6 className="fw-bold text-center mb-3"><FaListUl/> DANH SÁCH PHẦN</h6>
                        <div className="d-grid gap-2">
                            {TOEIC_STRUCTURE.map(struct => {
                                const qInPart = partsData[struct.part] || [];
                                const answeredInPart = qInPart.filter(q => userAnswers[q._id]).length;
                                const percent = Math.round((answeredInPart / qInPart.length) * 100) || 0;
                                
                                return (
                                    <Button 
                                        key={struct.part}
                                        variant={activePart === struct.part ? "primary" : "light"}
                                        className="text-start d-flex justify-content-between align-items-center mb-1"
                                        onClick={() => setActivePart(struct.part)}
                                    >
                                        <div className="text-truncate" style={{maxWidth: '120px'}}>
                                            <small className="fw-bold">Part {struct.part}</small>
                                        </div>
                                        <Badge bg={percent === 100 ? "success" : "secondary"}>{percent}%</Badge>
                                    </Button>
                                )
                            })}
                        </div>
                        <hr/>
                        <div className="text-center">
                            <small>Tổng: {Object.keys(userAnswers).length}/{allQuestions.length} câu</small>
                            <ProgressBar now={(Object.keys(userAnswers).length / allQuestions.length) * 100} variant="success" className="mt-1" style={{height: '5px'}}/>
                        </div>
                    </div>
                </Col>

                {/* MAIN CONTENT AREA - SWITCH VIEW TỰ ĐỘNG */}
                <Col md={10} className="p-4" style={{height: 'calc(100vh - 70px)', overflowY: 'auto'}}>
                    
                    {/* Audio Player chung cho Part hiện tại (Nếu backend có audio riêng cho từng part thì xử lý ở đây, nếu audio full test thì để header) */}
                    {quizData?.audio && (
                        <Card className="mb-4 shadow-sm">
                            <Card.Body className="py-2 px-3 d-flex align-items-center bg-light">
                                <FaVolumeUp className="text-primary me-3"/>
                                <audio controls className="w-100" style={{height: '35px'}}>
                                    <source src={quizData.audio} type="audio/mpeg"/>
                                </audio>
                            </Card.Body>
                        </Card>
                    )}

                    {/* === RENDER LOGIC THEO TỪNG PART === */}
                    {activePart === 1 && <RenderPart1 questions={currentQuestions} answers={userAnswers} onAnswer={handleAnswer} />}
                    
                    {activePart === 2 && <RenderPart2 questions={currentQuestions} answers={userAnswers} onAnswer={handleAnswer} />}
                    
                    {(activePart === 3 || activePart === 4) && <RenderPart34 questions={currentQuestions} answers={userAnswers} onAnswer={handleAnswer} partNum={activePart}/>}
                    
                    {activePart === 5 && <RenderPart5 questions={currentQuestions} answers={userAnswers} onAnswer={handleAnswer} />}
                    
                    {(activePart === 6 || activePart === 7) && <RenderPart67 questions={currentQuestions} answers={userAnswers} onAnswer={handleAnswer} />}

                </Col>
            </Row>
        </Container>
    );
};

// ============================================================================
// CÁC SUB-COMPONENT HIỂN THỊ RIÊNG CHO TỪNG PART (GIỐNG CÁC FILE LẺ)
// ============================================================================

const RenderPart1 = ({ questions, answers, onAnswer }) => (
    <Row className="g-4">
        {questions.map((q) => (
            <Col md={6} lg={4} key={q._id}>
                <Card className={`h-100 shadow-sm ${answers[q._id] ? 'border-success' : ''}`}>
                    <Card.Header className="bg-primary text-white d-flex justify-content-between">
                        <span className="fw-bold">Câu {q.globalIndex}</span>
                        {answers[q._id] && <FaCheckCircle className="text-warning" />}
                    </Card.Header>
                    <Card.Body className="p-3">
                        <div className="text-center mb-3 bg-dark rounded p-2">
                            {q.questionImage ? (
                                <img src={q.questionImage} alt="Q" className="img-fluid rounded" style={{maxHeight:'200px'}}/>
                            ) : <div className="text-white py-4">No Image</div>}
                        </div>
                        <div className="d-grid gap-2">
                            {q.options.map((opt, i) => {
                                const label = ['A','B','C','D'][i];
                                return (
                                    <Button key={i} variant={answers[q._id]===label ? 'success':'outline-secondary'} className="text-start" onClick={() => onAnswer(q._id, label)}>
                                        <span className="me-2 fw-bold">({label})</span> {opt.text}
                                    </Button>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
);

const RenderPart2 = ({ questions, answers, onAnswer }) => (
    <Row className="g-3">
        {questions.map((q) => (
            <Col md={6} lg={4} key={q._id}>
                <Card className={`shadow-sm ${answers[q._id] ? 'border-success' : ''}`}>
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Câu {q.globalIndex}</span>
                            {answers[q._id] && <FaCheckCircle className="text-success" />}
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            {['A','B','C'].map((label) => (
                                <Button 
                                    key={label} 
                                    variant={answers[q._id]===label ? 'primary':'outline-secondary'}
                                    className="rounded-circle fw-bold"
                                    style={{width:'50px', height:'50px'}}
                                    onClick={() => onAnswer(q._id, label)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
);

const RenderPart34 = ({ questions, answers, onAnswer }) => (
    <Container className="px-0">
        {questions.map((q) => (
            <Card key={q._id} className={`mb-3 shadow-sm ${answers[q._id] ? 'border-success' : ''}`}>
                <Card.Body>
                    <h6 className="fw-bold text-primary">Câu {q.globalIndex}</h6>
                    {/* Part 3/4 đôi khi có biểu đồ */}
                    {q.questionImage && <img src={q.questionImage} alt="Chart" className="img-fluid mb-3 rounded border" style={{maxHeight:'250px'}}/>}
                    <div className="mb-2 fw-semibold">{q.questionText[0]}</div>
                    <div className="d-flex flex-column gap-2">
                        {q.options.map((opt, i) => {
                            const label = ['A','B','C','D'][i];
                            return (
                                <div 
                                    key={i} 
                                    className={`p-2 border rounded cursor-pointer ${answers[q._id]===label ? 'bg-primary text-white' : 'bg-light hover-shadow'}`}
                                    onClick={() => onAnswer(q._id, label)}
                                    style={{cursor:'pointer'}}
                                >
                                    <span className="fw-bold me-2">({label})</span> {opt.text}
                                </div>
                            )
                        })}
                    </div>
                </Card.Body>
            </Card>
        ))}
    </Container>
);

const RenderPart5 = ({ questions, answers, onAnswer }) => (
    <Row>
        {questions.map((q) => (
            <Col md={6} key={q._id} className="mb-3">
                <Card className={`h-100 shadow-sm ${answers[q._id] ? 'border-success' : ''}`}>
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                            <Badge bg="secondary">Câu {q.globalIndex}</Badge>
                            {answers[q._id] && <FaCheckCircle className="text-success"/>}
                        </div>
                        <p className="fw-semibold mb-3">{q.questionText[0]}</p>
                        <div className="d-grid gap-2">
                            {q.options.map((opt, i) => {
                                const label = ['A','B','C','D'][i];
                                return (
                                    <Button key={i} variant={answers[q._id]===label ? "primary" : "outline-secondary"} className="text-start" onClick={() => onAnswer(q._id, label)}>
                                        <span className="fw-bold me-2">({label})</span> {opt.text}
                                    </Button>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
);

const RenderPart67 = ({ questions, answers, onAnswer }) => {
    // Logic gom nhóm Passage
    const groups = useMemo(() => {
        const result = [];
        let currentPassage = "";
        let currentGroup = [];
        
        questions.forEach((q, idx) => {
            // Tách passage từ questionText (do cách lưu trong Backend)
            let pText = "";
            let qContent = "";
            if (q.questionText.length > 1) {
                pText = q.questionText.slice(0, -1).join("\n\n");
                qContent = q.questionText[q.questionText.length - 1];
            } else {
                qContent = q.questionText[0];
            }
            q.displayContent = qContent; // Lưu lại để hiển thị bên dưới

            if (pText !== currentPassage) {
                if (currentGroup.length > 0) result.push({ passage: currentPassage, questions: currentGroup });
                currentPassage = pText;
                currentGroup = [q];
            } else {
                currentGroup.push(q);
            }
            if (idx === questions.length - 1) result.push({ passage: currentPassage, questions: currentGroup });
        });
        return result;
    }, [questions]);

    return (
        <div>
            {groups.map((group, idx) => (
                <div key={idx} className="mb-5">
                    {group.passage && (
                        <Card className="mb-3 bg-light border-secondary">
                            <Card.Body>
                                <h6 className="text-primary fw-bold mb-2">Reading Passage:</h6>
                                <div style={{whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1.05rem', fontFamily: 'serif'}}>
                                    {group.passage}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    {group.questions.map(q => (
                        <Card key={q._id} className={`mb-3 shadow-sm ${answers[q._id] ? 'border-success' : ''}`}>
                            <Card.Body>
                                <h6 className="fw-bold d-flex justify-content-between">
                                    <span>Câu {q.globalIndex}: {q.displayContent}</span>
                                    {answers[q._id] && <FaCheckCircle className="text-success"/>}
                                </h6>
                                <div className="mt-2 row">
                                    {q.options.map((opt, i) => {
                                        const label = ['A','B','C','D'][i];
                                        return (
                                            <Col md={6} key={i} className="mb-2">
                                                <div 
                                                    className={`p-2 border rounded cursor-pointer h-100 d-flex align-items-center ${answers[q._id]===label ? 'bg-primary text-white' : 'bg-white hover-bg-light'}`}
                                                    onClick={() => onAnswer(q._id, label)}
                                                    style={{cursor:'pointer'}}
                                                >
                                                    <span className="fw-bold me-2">({label})</span> {opt.text}
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TakeExamFullTest;