import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss'; 

const TakeExamPart6 = () => { // Đổi tên thành TakeExamPart6 cho file Part 6
    const { id } = useParams();
    const navigate = useNavigate();
    
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
                
                // XỬ LÝ DỮ LIỆU ĐẶC BIỆT CHO PART 6/7: TÁCH PASSAGE
                const processed = data.questions.map((q, i) => {
                    let passage = "";
                    let content = "";
                    const qTextArr = Array.isArray(q.questionText) ? q.questionText : [q.questionText];
                    
                    if (qTextArr.length > 1) {
                        passage = qTextArr.slice(0, -1).join("\n\n");
                        content = qTextArr[qTextArr.length - 1];
                    } else {
                        content = qTextArr[0];
                    }

                    return {
                        _id: q._id,
                        num: i + 1,
                        passage: passage, // Đoạn văn
                        text: content,    // Câu hỏi
                        options: q.options
                    };
                });
                setQuestions(processed);
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

    useEffect(() => {
        if (!timeLeft) return;
        const t = setInterval(() => setTimeLeft(p => (p <= 1 ? (handleSubmit(), 0) : p - 1)), 1000);
        return () => clearInterval(t);
    }, [timeLeft, handleSubmit]);

    const handleSelect = (qId, opt) => setUserAnswers(p => ({ ...p, [qId]: opt }));
    const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2,'0')}:${(s % 60).toString().padStart(2,'0')}`;

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <div className="take-exam-part7">
             <div className="exam-header sticky-top bg-white border-bottom p-3 d-flex justify-content-between shadow-sm">
                 <Button variant="outline-dark" onClick={() => navigate(-1)}><FaArrowLeft/> Back</Button>
                 <div className="fw-bold text-danger fs-5"><FaClock/> {formatTime(timeLeft)}</div>
                 <Button variant="success" onClick={handleSubmit}>FINISH</Button>
            </div>

            <Container className="py-4">
                {questions.map((q, index) => {
                    // Logic gom nhóm hiển thị (Nếu câu này có passage khác câu trước, hoặc là câu đầu tiên -> Render Passage)
                    const prevQ = questions[index - 1];
                    const showPassage = q.passage && (!prevQ || prevQ.passage !== q.passage);

                    return (
                        <div key={q._id}>
                            {showPassage && (
                                <Card className="mb-3 bg-light border-secondary">
                                    <Card.Body>
                                        <h6 className="text-primary fw-bold">Reading Passage:</h6>
                                        <div style={{whiteSpace: 'pre-wrap', fontFamily: 'serif', fontSize: '1.1rem'}}>
                                            {q.passage}
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}

                            <Card className={`mb-4 shadow-sm ${userAnswers[q._id] ? 'border-success' : ''}`}>
                                <Card.Body>
                                    <h6 className="fw-bold">Question {q.num}: {q.text}</h6>
                                    <div className="mt-3">
                                        {q.options.map((opt, i) => {
                                            const label = ['A','B','C','D'][i];
                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`p-2 mb-2 border rounded cursor-pointer ${userAnswers[q._id] === label ? 'bg-primary text-white' : 'bg-white hover-bg-light'}`}
                                                    onClick={() => handleSelect(q._id, label)}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    <span className="fw-bold me-2">({label})</span> {opt.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
};
export default TakeExamPart6;