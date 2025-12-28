import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService'; // Hãy chắc chắn đường dẫn đúng
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
        if (answeredCount < questions.length) {
            if (!window.confirm(`Bạn mới trả lời ${answeredCount}/${questions.length} câu. Nộp bài?`)) return;
        }

        try {
            setSubmitting(true);
            const answers = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
                questionId, selectedOption
            }));
            const submitData = {
                quizId: id,
                answers: answers,
                timeSpent: ((quizData?.timeLimit || 30) * 60) - timeLeft
            };

            const response = await postSubmitQuiz(submitData);
            if (response?.data) {
                const resultId = response.data._id || response.data.id;
                navigate(`/result/${resultId}`);
            }
        } catch (err) {
            alert("Lỗi nộp bài: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    }, [questions, userAnswers, id, quizData, timeLeft, navigate]);

    useEffect(() => {
        if (!timeLeft || timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { handleSubmit(); return 0; }
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
    
    const answeredCount = Object.keys(userAnswers).length;

    return (
        <div className="take-exam-part2">
            <div className="exam-header sticky-top">
                <Container fluid="lg">
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <div className="d-flex align-items-center gap-3">
                            <Button variant="light" className="btn-icon-text shadow-sm" onClick={() => navigate(-1)}>
                                <FaArrowLeft/> Thoát
                            </Button>
                            <h5 className="m-0 fw-bold text-dark d-none d-md-block">
                                {quizData?.title || "Part 2: Question-Response"}
                            </h5>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <div className={`timer-box ${timeLeft < 300 ? 'danger' : ''}`}>
                                <FaClock className="me-2"/> {formatTime(timeLeft)}
                            </div>
                            <Button variant="primary" className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? <Spinner size="sm"/> : 'NỘP BÀI'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-4 main-container">
                {audioUrl && (
                    <Card className="audio-card mb-4 border-0">
                        <Card.Body className="d-flex align-items-center gap-3 p-4">
                            <div className="audio-icon-box">
                                <FaVolumeUp />
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
                                <Card className={`question-card h-100 border-0 ${isAnswered ? 'answered' : ''}`}>
                                    <Card.Body className="p-4 text-center">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="question-badge">Câu {q.questionNum}</span>
                                            {isAnswered && <FaCheckCircle className="text-success fs-5 animate-check" />}
                                        </div>
                                        
                                        <p className="text-muted small mb-4">Chọn đáp án đúng tương ứng với audio.</p>

                                        <div className="d-flex justify-content-center gap-4">
                                            {q.options.map((opt, idx) => {
                                                const label = ['A', 'B', 'C'][idx];
                                                if (!label) return null;
                                                const isSelected = userAnswers[q._id] === label;
                                                
                                                return (
                                                    <Button 
                                                        key={idx} 
                                                        // QUAN TRỌNG: Dùng 'outline-secondary' để mặc định là trong suốt/xám nhạt
                                                        // CSS sẽ đè màu trắng lên
                                                        variant="outline-secondary" 
                                                        className={`option-btn ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleSelectAnswer(q._id, label)}
                                                    >
                                                        {label}
                                                    </Button>
                                                )
                                            })}
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