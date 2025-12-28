import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss'; 

const TakeExamPart5 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // ... (Giữ nguyên các State và useEffect Fetch Data như Part 1)
    // CHỈ KHÁC LOGIC RENDER BÊN DƯỚI
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                let data = response?.data || response;
                if (data?.DT) data = data.DT;
                setQuizData(data);
                setTimeLeft((data.timeLimit || 75) * 60);
                
                setQuestions(data.questions.map((q, i) => ({
                    _id: q._id,
                    num: i + 1,
                    text: Array.isArray(q.questionText) ? q.questionText.join(" ") : q.questionText,
                    options: q.options
                })));
            } catch (err) { alert(err.message); } 
            finally { setLoading(false); }
        };
        fetchQuiz();
    }, [id]);

    const handleSubmit = useCallback(async () => {
        setSubmitting(true);
        try {
            const answers = Object.entries(userAnswers).map(([k, v]) => ({ questionId: k, selectedOption: v }));
            const res = await postSubmitQuiz({ quizId: id, answers, timeSpent: ((quizData?.timeLimit) * 60) - timeLeft });
            if (res?.data) navigate(`/result/${res.data._id}`);
        } catch (err) { alert("Lỗi: " + err.message); } 
        finally { setSubmitting(false); }
    }, [questions, userAnswers, id, quizData, timeLeft, navigate]);

    // Timer effect giữ nguyên...
    useEffect(() => {
        if (!timeLeft) return;
        const t = setInterval(() => setTimeLeft(p => (p <= 1 ? (handleSubmit(), 0) : p - 1)), 1000);
        return () => clearInterval(t);
    }, [timeLeft, handleSubmit]);

    const handleSelect = (qId, opt) => setUserAnswers(p => ({ ...p, [qId]: opt }));
    const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2,'0')}:${(s % 60).toString().padStart(2,'0')}`;

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <div className="take-exam-part5">
            <div className="exam-header sticky-top bg-white border-bottom p-3 d-flex justify-content-between">
                 <Button variant="outline-dark" onClick={() => navigate(-1)}><FaArrowLeft/> Back</Button>
                 <div className="fw-bold text-danger fs-5"><FaClock/> {formatTime(timeLeft)}</div>
                 <Button variant="success" onClick={handleSubmit}>SUBMIT</Button>
            </div>
            
            <Container className="py-5">
                <Row>
                    {questions.map((q) => (
                        <Col md={6} key={q._id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="badge bg-primary">Question {q.num}</span>
                                        {userAnswers[q._id] && <FaCheckCircle className="text-success"/>}
                                    </div>
                                    <p className="fw-semibold mb-4" style={{fontSize: '1.1rem'}}>{q.text}</p>
                                    <div className="d-grid gap-2">
                                        {q.options.map((opt, i) => {
                                            const label = ['A','B','C','D'][i];
                                            return (
                                                <Button 
                                                    key={i} 
                                                    variant={userAnswers[q._id] === label ? "primary" : "outline-secondary"}
                                                    className="text-start"
                                                    onClick={() => handleSelect(q._id, label)}
                                                >
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
            </Container>
        </div>
    );
};
export default TakeExamPart5;