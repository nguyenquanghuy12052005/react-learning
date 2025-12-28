import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FaClock, FaArrowLeft, FaCheckCircle, FaImage, FaVolumeUp } from 'react-icons/fa';
import { getQuizById, postSubmitQuiz } from '../../services/quizService';
import './TakeExamPart1.scss';

// === HÀM FIX LINK AUDIO GOOGLE DRIVE ===
const getDirectAudioLink = (url) => {
    if (!url) return "";

    // 1. Nếu là link Google Drive
    if (url.includes("drive.google.com")) {
        // Regex lấy ID nằm giữa "/d/" và "/view" (hoặc dấu / bất kỳ)
        // Link mẫu: .../file/d/1vANZf3xMix5kkr7tipW4p95MTZDeiI7r/view...
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            // Trả về link stream trực tiếp (Bỏ /view, thay bằng export=download)
            return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
    }

    // 2. Nếu là link bình thường (cloudinary, server riêng...) thì giữ nguyên
    return url;
};

const TakeExamPart1 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // ... Khai báo State giữ nguyên ...
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    
    // State lưu link audio CHÍNH (của cả bài thi)
    const [mainAudioUrl, setMainAudioUrl] = useState("");

    // === FETCH DATA ===
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getQuizById(id);
                let data = response?.data || response;
                if (data?.DT) data = data.DT;

                console.log("📦 Dữ liệu gốc:", data);

                if (!data) throw new Error("Không tìm thấy dữ liệu");

                setQuizData(data);
                setTimeLeft((data.timeLimit || 10) * 60);

                // === SỬA LỖI AUDIO TẠI ĐÂY ===
                // 1. Lấy field 'audio' ở ngoài cùng (root)
                const rawLink = data.audio || ""; 
                
                // 2. Chuyển đổi link /view -> link trực tiếp
                const cleanLink = getDirectAudioLink(rawLink);
                
                console.log("🔗 Link gốc:", rawLink);
                console.log("✅ Link đã fix:", cleanLink);
                
                setMainAudioUrl(cleanLink); 
                // =============================

                // Xử lý Questions (giữ nguyên logic cũ)
                const rawQuestions = data.questions || [];
                const processedQuestions = rawQuestions.map((q, idx) => ({
                    _id: q._id,
                    questionNum: idx + 1,
                    questionText: Array.isArray(q.questionText) ? q.questionText.join(" ") : (q.questionText || ""),
                    questionImage: q.questionImage || "",
                    options: q.options || [],
                    // Lưu ý: data của bạn questionAudio đang rỗng, nên dòng dưới này sẽ trả về ""
                    questionAudio: q.questionAudio || "" 
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

    // ... (Giữ nguyên logic Submit, Timer, HandleAnswer) ...
    const handleSubmit = useCallback(async () => { /* ...code cũ... */ }, [questions, userAnswers, id, quizData, timeLeft, navigate]);
    useEffect(() => { /* ...timer code... */ }, [timeLeft, handleSubmit]);
    const formatTime = (seconds) => { /* ...code cũ... */ };
    const handleSelectAnswer = (qId, opt) => { setUserAnswers(prev => ({ ...prev, [qId]: opt })); };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border"/></div>;
    if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

    const answeredCount = Object.keys(userAnswers).length;

    return (
        <div className="take-exam-part1">
            {/* Header Sticky */}
            <div className="exam-header sticky-top bg-white shadow-sm px-4 py-3 border-bottom">
                {/* ... (Code header giữ nguyên) ... */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}><FaArrowLeft/> Thoát</Button>
                        <h5 className="m-0 fw-bold text-primary">📷 {quizData?.title}</h5>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="timer-box fw-bold border px-3 py-2 rounded-pill text-danger"><FaClock className="me-2"/> {formatTime(timeLeft)}</div>
                        <Button variant="success" onClick={handleSubmit} disabled={submitting}>NỘP BÀI</Button>
                    </div>
                </div>
            </div>

            <Container className="py-4">
                
                {/* === PLAYER AUDIO CHÍNH === */}
                {/* Chỉ hiển thị khi có link audio tổng */}
                {mainAudioUrl && (
                    <Card className="mb-4 shadow-sm border-primary">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-2">
                                <FaVolumeUp className="text-primary me-2" size={24}/>
                                <h6 className="m-0 fw-bold">🎧 Audio Part 1 (Nghe chung cho cả bài)</h6>
                            </div>
                            
                            {/* Key={mainAudioUrl} buộc player render lại khi link thay đổi */}
                            <audio controls className="w-100" style={{height: '50px'}} key={mainAudioUrl}>
                                <source src={mainAudioUrl} type="audio/mpeg" />
                                Trình duyệt không hỗ trợ audio.
                            </audio>
                            
                            <div className="mt-2 small text-muted">
                                * Nếu không nghe được: <a href={mainAudioUrl} target="_blank" rel="noreferrer">Nhấn vào đây để tải file</a>
                            </div>
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
                                        {/* Hình ảnh */}
                                        <div className="text-center mb-3 bg-dark rounded p-2">
                                            {q.questionImage ? (
                                                <img src={q.questionImage} className="img-fluid rounded" style={{maxHeight:'200px'}} alt="Q"/>
                                            ) : <div className="text-white py-3">No Image</div>}
                                        </div>

                                        {/* Lựa chọn */}
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
                        {submitting ? '...' : 'NỘP BÀI NGAY'}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default TakeExamPart1;