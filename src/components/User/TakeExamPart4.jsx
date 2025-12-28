import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss'; 

const TakeExamPart4 = () => { // Đổi tên thành TakeExamPart4 cho file Part 4
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
                setTimeLeft((data.timeLimit || 45) * 60);
                setAudioUrl(data.audio || "");

                const rawQuestions = data.questions || [];
                const processedQuestions = rawQuestions.map((q, idx) => ({
                    _id: q._id,
                    questionNum: idx + 1,
                    questionText: Array.isArray(q.questionText) ? q.questionText.join(" ") : (q.questionText || ""),
                    options: q.options || [],
                    questionImage: q.questionImage || "" // Đôi khi Part 3/4 có biểu đồ
                }));
                setQuestions(processedQuestions);
            } catch (err) { setError(err.message); } 
            finally { setLoading(false); }
        };
        fetchQuiz();
    }, [id]);

    const handleSubmit = useCallback(async () => {
        if (Object.keys(userAnswers).length < questions.length) {
            if (!window.confirm("Chưa làm hết bài. Nộp luôn?")) return;
        }
        setSubmitting(true);
        try {
            const answers = Object.entries(userAnswers).map(([k, v]) => ({ questionId: k, selectedOption: v }));
            const res = await postSubmitQuiz({ quizId: id, answers, timeSpent: ((quizData?.timeLimit || 45) * 60) - timeLeft });
            if (res?.data) navigate(`/result/${res.data._id || res.data.id}`);
        } catch (err) { alert("Lỗi: " + err.message); } 
        finally { setSubmitting(false); }
    }, [questions, userAnswers, id, quizData, timeLeft, navigate]);

    useEffect(() => {
        if (!timeLeft) return;
        const t = setInterval(() => setTimeLeft(p => (p <= 1 ? (handleSubmit(), 0) : p - 1)), 1000);
        return () => clearInterval(t);
    }, [timeLeft, handleSubmit]);

    const handleSelectAnswer = (qId, opt) => setUserAnswers(p => ({ ...p, [qId]: opt }));
    const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2,'0')}:${(s % 60).toString().padStart(2,'0')}`;

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <div className="take-exam-part3">
            <div className="exam-header sticky-top bg-white shadow-sm px-4 py-3 border-bottom">
                 <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3"><Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}><FaArrowLeft/> Exit</Button> <h5>{quizData?.title}</h5></div>
                    <div className="d-flex gap-3"><span className="text-danger fw-bold"><FaClock/> {formatTime(timeLeft)}</span> <Button variant="success" onClick={handleSubmit}>NỘP BÀI</Button></div>
                </div>
            </div>
            <Container className="py-4">
                {audioUrl && <Card className="mb-4 p-3"><audio controls src={audioUrl} className="w-100"/></Card>}
                <Row>
                    {questions.map((q) => (
                        <Col md={12} key={q._id} className="mb-3">
                            <Card className={userAnswers[q._id] ? "border-success" : ""}>
                                <Card.Body>
                                    <h6 className="fw-bold">Question {q.questionNum}: {q.questionText}</h6>
                                    {q.questionImage && <img src={q.questionImage} alt="Graphic" className="img-fluid mb-3" style={{maxHeight:'200px'}}/>}
                                    <div className="d-flex flex-column gap-2 mt-2">
                                        {q.options.map((opt, i) => {
                                            const label = ['A','B','C','D'][i];
                                            const isSel = userAnswers[q._id] === label;
                                            return (
                                                <div key={i} className={`p-2 border rounded cursor-pointer ${isSel ? 'bg-primary text-white' : 'bg-light'}`} onClick={() => handleSelectAnswer(q._id, label)}>
                                                    <span className="fw-bold me-2">({label})</span> {opt.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
export default TakeExamPart4; // Copy y hệt cho Part 4 và đổi tên export