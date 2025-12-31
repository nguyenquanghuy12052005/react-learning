import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaVolumeUp } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss';

// Hàm fix link Google Drive
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
                setTimeLeft((data.timeLimit || 10) * 60); // Set thời gian từ DB

                // Xử lý Audio
                const cleanLink = getDirectAudioLink(data.audio || "");
                setMainAudioUrl(cleanLink); 

                // Xử lý câu hỏi
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
                    handleSubmit(); // Hết giờ tự nộp
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
        setSubmitting(true);

        try {
            // Tính thời gian làm bài
            const totalTime = (quizData?.timeLimit || 0) * 60;
            const timeSpent = totalTime - timeLeft;

            // Format đáp án: "A" -> "(A)"
            const formattedAnswers = Object.entries(userAnswers).map(([qId, val]) => ({
                questionId: qId,
                selectedOption: `(${val})` 
            }));

            const payload = {
                quizId: id,
                answers: formattedAnswers,
                timeSpent: timeSpent > 0 ? timeSpent : 0
            };

            console.log("Submitting:", payload);
            const res = await postSubmitQuiz(payload);
            const resultData = res.data || res;

            if (resultData && resultData._id) {
                // Chuyển sang trang kết quả
                navigate(`/quiz-result/${resultData._id}`);
            } else {
                alert("Nộp bài thành công nhưng không lấy được ID kết quả.");
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

    if (loading) return <div className="text-center mt-5"><Spinner animation="border"/></div>;
    if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

    return (
        <div className="take-exam-part1">
            {/* Header */}
            <div className="exam-header sticky-top bg-white shadow-sm px-4 py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}><FaArrowLeft/> Thoát</Button>
                        <h5 className="m-0 fw-bold text-primary">📷 {quizData?.title}</h5>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="timer-box fw-bold border px-3 py-2 rounded-pill text-danger">
                            <FaClock className="me-2"/> {formatTime(timeLeft)}
                        </div>
                        <Button variant="success" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? <Spinner size="sm" animation="border"/> : "NỘP BÀI"}
                        </Button>
                    </div>
                </div>
            </div>

            <Container className="py-4">
                {/* Audio Player */}
                {mainAudioUrl && (
                    <Card className="mb-4 shadow-sm border-primary">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-2">
                                <FaVolumeUp className="text-primary me-2" size={24}/>
                                <h6 className="m-0 fw-bold">🎧 Audio Part 1</h6>
                            </div>
                            <audio controls className="w-100" style={{height: '50px'}} key={mainAudioUrl}>
                                <source src={mainAudioUrl} type="audio/mpeg" />
                            </audio>
                        </Card.Body>
                    </Card>
                )}

                {/* Danh sách câu hỏi */}
                <Row className="g-4">
                    {questions.map((q) => {
                        const isAnswered = !!userAnswers[q._id];
                        return (
                            <Col md={6} lg={4} key={q._id}>
                                <Card className={`h-100 shadow-sm border-2 ${isAnswered ? 'border-success' : 'border-secondary'}`}>
                                    <Card.Header className="bg-primary text-white d-flex justify-content-between">
                                        <span className="fw-bold">Question {q.questionNum}</span>
                                        {isAnswered && <FaCheckCircle className="text-warning" />}
                                    </Card.Header>
                                    <Card.Body className="p-3">
                                        <div className="text-center mb-3 bg-dark rounded p-2">
                                            {q.questionImage ? (
                                                <img src={q.questionImage} className="img-fluid rounded" style={{maxHeight:'200px'}} alt="Q"/>
                                            ) : <div className="text-white py-3">No Image</div>}
                                        </div>
                                        <div className="d-grid gap-2">
                                            {q.options.map((opt, idx) => {
                                                const label = ['A', 'B', 'C', 'D'][idx];
                                                return (
                                                    <Button 
                                                        key={idx} 
                                                        variant={userAnswers[q._id] === label ? 'success' : 'outline-secondary'}
                                                        className="text-start"
                                                        onClick={() => handleSelectAnswer(q._id, label)}
                                                    >
                                                        <span className="me-2 fw-bold">({label})</span> {opt.text}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>

                <div className="text-center mt-5">
                    <Button variant="success" size="lg" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Đang nộp...' : 'NỘP BÀI NGAY'}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default TakeExamPart1;