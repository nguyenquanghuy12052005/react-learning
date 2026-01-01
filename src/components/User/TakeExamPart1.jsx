import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp, FaImage } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss';

// Hàm fix link Google Drive (giữ nguyên logic của bạn)
const getDirectAudioLink = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
    }
    return url;
};

const TakeExamPart1 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [mainAudioUrl, setMainAudioUrl] = useState("");

    // 1. Load đề thi
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                let data = response?.data || response;
                if (data?.DT) data = data.DT;

                if (!data) throw new Error("Không tìm thấy dữ liệu");

                setQuizData(data);
                setTimeLeft((data.timeLimit || 10) * 60);

                const cleanLink = getDirectAudioLink(data.audio || "");
                setMainAudioUrl(cleanLink); 

                const rawQuestions = data.questions || [];
                const processedQuestions = rawQuestions.map((q, idx) => ({
                    _id: q._id,
                    questionNum: idx + 1,
                    questionText: Array.isArray(q.questionText) ? q.questionText.join(" ") : (q.questionText || ""),
                    questionImage: q.questionImage || "",
                    options: q.options || [],
                    point: q.point || 1
                }));

                setQuestions(processedQuestions);
            } catch (err) {
                console.error(err);
                setError(err.message || "Lỗi tải đề thi");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    // 2. Đồng hồ đếm ngược
    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // 3. Xử lý Nộp bài
    const handleSubmit = useCallback(async () => {
        if (submitting) return;

        // Confirm nếu chưa làm hết (trừ khi hết giờ)
        const answeredCount = Object.keys(userAnswers).length;
        if (timeLeft > 0 && answeredCount < questions.length) {
             if (!window.confirm(`Bạn mới trả lời ${answeredCount}/${questions.length} câu. Bạn có chắc chắn muốn nộp bài?`)) return;
        }

        setSubmitting(true);
        try {
            const totalTime = (quizData?.timeLimit || 0) * 60;
            const timeSpent = totalTime - timeLeft;

            const formattedAnswers = Object.entries(userAnswers).map(([qId, val]) => ({
                questionId: qId,
                selectedOption: `(${val})` 
            }));

            const payload = {
                quizId: id,
                answers: formattedAnswers,
                timeSpent: timeSpent > 0 ? timeSpent : 0
            };

            const res = await postSubmitQuiz(payload);
            const resultData = res.data || res; // Xử lý tùy theo cấu trúc response của bạn (axios wrap hay custom)
            
            // Tìm ID kết quả để redirect
            const resultId = resultData.DT?._id || resultData._id || resultData.data?._id;

            if (resultId) {
                navigate(`/quiz-result/${resultId}`);
            } else {
                // Fallback nếu không tìm thấy ID
                navigate('/exams'); 
            }

        } catch (error) {
            console.error("Lỗi nộp bài:", error);
            alert("Có lỗi xảy ra khi nộp bài!");
            setSubmitting(false);
        }
    }, [questions, userAnswers, id, quizData, timeLeft, navigate, submitting]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelectAnswer = (qId, opt) => { 
        if(submitting) return;
        setUserAnswers(prev => ({ ...prev, [qId]: opt })); 
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary"/></div>;
    if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

    return (
        <div className="take-exam-part1">
            {/* Header Sticky - Style Part 3 */}
            <div className="exam-header sticky-top bg-white shadow-sm">
                <Container fluid="lg">
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <div className="d-flex align-items-center gap-3">
                            <Button variant="light" className="btn-icon-text border" onClick={() => navigate(-1)}>
                                <FaArrowLeft/> <span className="d-none d-sm-inline">Thoát</span>
                            </Button>
                            <h5 className="m-0 fw-bold text-dark d-none d-md-block">
                                📷 {quizData?.title || "Part 1: Photographs"}
                            </h5>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div className={`timer-box ${timeLeft < 300 ? 'danger' : ''}`}>
                                <FaClock className="me-2"/> {formatTime(timeLeft)}
                            </div>
                            <Button variant="success" className="btn-submit fw-bold px-4" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? <Spinner size="sm" animation="border"/> : "NỘP BÀI"}
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-4 main-container">
                {/* Audio Player - Style Part 3 */}
                {mainAudioUrl && (
                    <Card className="audio-card mb-4 border-0 shadow-sm sticky-audio">
                        <Card.Body className="d-flex align-items-center gap-3 p-3">
                            <div className="audio-icon-box bg-primary text-white rounded-circle p-3">
                                <FaVolumeUp size={24} />
                            </div>
                            <div className="w-100">
                                <h6 className="fw-bold mb-1 text-primary">Audio Part 1</h6>
                                <audio controls className="w-100 custom-audio" key={mainAudioUrl}>
                                    <source src={mainAudioUrl} type="audio/mpeg" />
                                </audio>
                            </div>
                        </Card.Body>
                    </Card>
                )}

                {/* Danh sách câu hỏi - Grid Layout nhưng style Part 3 */}
                <Row className="g-4">
                    {questions.map((q) => {
                        const isAnswered = !!userAnswers[q._id];
                        return (
                            <Col md={6} lg={4} key={q._id}>
                                <Card className={`h-100 shadow-sm border-0 question-card ${isAnswered ? 'answered-card' : ''}`}>
                                    <Card.Header className="bg-white border-bottom pt-3 pb-2 d-flex justify-content-between align-items-center">
                                        <span className={`fw-bold ${isAnswered ? 'text-success' : 'text-dark'}`}>
                                            Question {q.questionNum}
                                        </span>
                                        {isAnswered && <FaCheckCircle className="text-success" />}
                                    </Card.Header>
                                    
                                    <Card.Body className="p-3">
                                        {/* Hình ảnh */}
                                        <div className="image-container mb-3 text-center border rounded bg-light p-2">
                                            {q.questionImage ? (
                                                <img 
                                                    src={q.questionImage} 
                                                    className="img-fluid rounded" 
                                                    style={{ maxHeight:'250px', objectFit: 'contain' }} 
                                                    alt={`Question ${q.questionNum}`}
                                                />
                                            ) : (
                                                <div className="text-muted py-5 d-flex flex-column align-items-center">
                                                    <FaImage size={30} className="mb-2"/>
                                                    <span>No Image Available</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Text câu hỏi (nếu có) */}
                                        {q.questionText && <p className="mb-3 fw-medium text-secondary">{q.questionText}</p>}

                                        {/* Options - Style Part 3 */}
                                        <div className="options-grid">
                                            {q.options.map((opt, idx) => {
                                                const label = ['A', 'B', 'C', 'D'][idx];
                                                const isSelected = userAnswers[q._id] === label;
                                                
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        className={`option-item d-flex align-items-center py-2 px-3 rounded mb-2 ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleSelectAnswer(q._id, label)}
                                                    >
                                                        <div className={`option-radio me-3 ${isSelected ? 'checked' : ''}`}>
                                                            {label}
                                                        </div>
                                                        <div className="option-text">
                                                            {opt.text || `Option ${label}`}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default TakeExamPart1;