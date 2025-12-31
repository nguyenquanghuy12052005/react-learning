import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaClock, FaTrophy, FaList } from 'react-icons/fa';
import { getQuizResultById } from '../../services/quizService';

const QuizResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await getQuizResultById(id);
                // Xử lý response tùy theo cấu hình axios của bạn
                const data = res.data || res;
                setResult(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [id]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}p ${s}s`;
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary"/></div>;
    if (!result) return <Alert variant="danger" className="m-5">Không tìm thấy kết quả!</Alert>;

    // Model của bạn trả về: quizId (populate), score, answers, timeSpent
    const { quizId: quizInfo, score, answers, timeSpent } = result;
    const correctCount = answers.filter(a => a.isCorrect).length;

    return (
        <Container className="py-5">
            <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/exams')}>
                <FaArrowLeft /> Quay lại danh sách
            </Button>

            {/* HEADER KẾT QUẢ */}
            <Card className="shadow border-0 mb-4 overflow-hidden">
                <div className="bg-primary p-4 text-white text-center">
                    <h2 className="fw-bold mb-0">{quizInfo?.title || "KẾT QUẢ BÀI THI"}</h2>
                </div>
                <Card.Body className="p-4 bg-light">
                    <Row className="justify-content-center text-center">
                        <Col md={3} className="mb-3">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <FaTrophy size={40} className="text-warning mb-2"/>
                                    <div className="text-muted text-uppercase small fw-bold">Điểm số</div>
                                    <h2 className="text-primary fw-bold">{score}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <FaCheckCircle size={40} className="text-success mb-2"/>
                                    <div className="text-muted text-uppercase small fw-bold">Số câu đúng</div>
                                    <h2 className="text-success fw-bold">{correctCount}/{answers.length}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <FaClock size={40} className="text-info mb-2"/>
                                    <div className="text-muted text-uppercase small fw-bold">Thời gian</div>
                                    <h2 className="text-info fw-bold">{formatTime(timeSpent)}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* CHI TIẾT CÂU TRẢ LỜI */}
            <h4 className="mb-3 fw-bold text-primary"><FaList/> Chi tiết bài làm</h4>
            <Row className="g-3">
                {answers.map((ans, index) => (
                    <Col md={6} key={index}>
                        <Card className={`h-100 shadow-sm border-start border-5 ${ans.isCorrect ? 'border-success' : 'border-danger'}`}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fw-bold badge bg-secondary">Câu {index + 1}</span>
                                    {ans.isCorrect ? (
                                        <Badge bg="success"><FaCheckCircle/> Đúng (+{ans.point})</Badge>
                                    ) : (
                                        <Badge bg="danger"><FaTimesCircle/> Sai (0đ)</Badge>
                                    )}
                                </div>
                                <div>
                                    <small className="text-muted">Bạn đã chọn:</small>
                                    <div className={`fw-bold fs-5 ${ans.isCorrect ? 'text-success' : 'text-danger'}`}>
                                        {ans.selectedOption || "(Bỏ trống)"}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default QuizResult;