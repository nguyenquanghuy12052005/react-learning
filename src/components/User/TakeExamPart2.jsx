import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService'; 
import './TakeExamPart2.scss';

const TakeExamPart2 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [audioUrl, setAudioUrl] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                let data = response?.data || response;
                if (data?.DT) data = data.DT;

                setQuizData(data);
                setTimeLeft((data.timeLimit || 30) * 60);
                setAudioUrl(data.audio || "");

                const rawQuestions = data.questions || [];
                const processedQuestions = rawQuestions.map((q, idx) => ({
                    _id: q._id,
                    questionNum: idx + 1,
                    // Part 2 thường không có text câu hỏi, nhưng nếu có thì vẫn hiện
                    questionText: Array.isArray(q.questionText) ? q.questionText.join(" ") : (q.questionText || ""),
                    options: q.options || [],
                    correctAnswer: q.correctAnswer || ""
                }));

                setQuestions(processedQuestions);
            } catch (err) {
                setError(err.message || "Lỗi tải đề thi");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleSubmit = useCallback(async () => {
        const answeredCount = Object.keys(userAnswers).length;
        // Chỉ confirm nếu người dùng tự bấm nộp, còn hết giờ thì không cần confirm
        if (timeLeft > 0 && answeredCount < questions.length) {
            if (!window.confirm(`Bạn mới trả lời ${answeredCount}/${questions.length} câu. Bạn có chắc chắn muốn nộp bài?`)) return;
        }

        try {
            setSubmitting(true);
            const answers = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
                questionId, selectedOption
            }));
            
            // Tính thời gian đã làm: Tổng thời gian - Thời gian còn lại
            const totalTime = (quizData?.timeLimit || 30) * 60;
            const timeSpent = totalTime - timeLeft;

            const submitData = {
                quizId: id,
                answers: answers,
                timeSpent: timeSpent > 0 ? timeSpent : totalTime // Fix trường hợp âm
            };

            const response = await postSubmitQuiz(submitData);
            
            if (response && (response.EC === 0 || response.status === 200 || response.data)) {
                 // Lấy ID kết quả trả về từ backend
                const resultData = response.DT || response.data; 
                const resultId = resultData._id || resultData.id;
                
                // --- QUAN TRỌNG: Điều hướng đúng route đã khai báo trong index.js ---
                navigate(`/quiz-result/${resultId}`);
            } else {
                alert("Nộp bài không thành công: " + (response.EM || "Lỗi không xác định"));
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    }, [questions, userAnswers, id, quizData, timeLeft, navigate]);

    useEffect(() => {
        if (!timeLeft || timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { 
                    clearInterval(timerId);
                    handleSubmit(); // Hết giờ tự nộp
                    return 0; 
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, handleSubmit]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const handleSelectAnswer = (questionId, option) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    if (loading) return <div className="text-center pt-5"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <Container className="pt-5"><Alert variant="danger">{error}</Alert></Container>;
    
    return (
        <div className="take-exam-part2">
            <div className="exam-header sticky-top bg-white shadow-sm">
                <Container fluid="lg">
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <div className="d-flex align-items-center gap-3">
                            <Button variant="light" className="btn-icon-text border" onClick={() => navigate(-1)}>
                                <FaArrowLeft/> <span className="d-none d-sm-inline">Thoát</span>
                            </Button>
                            <h5 className="m-0 fw-bold text-dark d-none d-md-block">
                                {quizData?.title || "Part 2: Question-Response"}
                            </h5>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <div className={`timer-box ${timeLeft < 300 ? 'danger' : ''}`}>
                                <FaClock className="me-2"/> {formatTime(timeLeft)}
                            </div>
                            <Button variant="primary" className="btn-submit fw-bold px-4" onClick={() => handleSubmit()} disabled={submitting}>
                                {submitting ? <Spinner size="sm"/> : 'NỘP BÀI'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-4 main-container">
                {audioUrl && (
                    <Card className="audio-card mb-4 border-0 shadow-sm">
                        <Card.Body className="d-flex align-items-center gap-3 p-3 p-md-4">
                            <div className="audio-icon-box bg-primary text-white rounded-circle p-3">
                                <FaVolumeUp size={24} />
                            </div>
                            <div className="w-100">
                                <h6 className="fw-bold mb-2 text-primary">Audio Part 2</h6>
                                <audio controls className="w-100 custom-audio"><source src={audioUrl} type="audio/mpeg" /></audio>
                            </div>
                        </Card.Body>
                    </Card>
                )}

                <Row className="g-4">
                    {questions.map((q) => {
                        const isAnswered = !!userAnswers[q._id];
                        return (
                            <Col md={6} lg={4} key={q._id}>
                                <Card className={`question-card h-100 border-0 shadow-sm ${isAnswered ? 'answered' : ''}`}>
                                    <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
                                        <div className="d-flex justify-content-between align-items-center mb-3 w-100 position-absolute top-0 start-0 p-3">
                                            <span className="badge bg-light text-dark border">Câu {q.questionNum}</span>
                                            {isAnswered && <FaCheckCircle className="text-success fs-5 animate-check" />}
                                        </div>
                                        
                                        <div className="mt-4">
                                            <p className="text-muted small mb-4 fst-italic">Listen and choose the best response</p>

                                            <div className="d-flex justify-content-center gap-3 gap-md-4">
                                                {/* Part 2 thường chỉ có 3 đáp án A, B, C */}
                                                {['A', 'B', 'C'].map((label, idx) => {
                                                    const isSelected = userAnswers[q._id] === label;
                                                    
                                                    return (
                                                        <Button 
                                                            key={idx} 
                                                            variant={isSelected ? "primary" : "outline-secondary"}
                                                            className={`option-btn rounded-circle p-0 d-flex align-items-center justify-content-center ${isSelected ? 'selected' : ''}`}
                                                            style={{ width: '45px', height: '45px', fontWeight: 'bold' }}
                                                            onClick={() => handleSelectAnswer(q._id, label)}
                                                        >
                                                            {label}
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default TakeExamPart2;