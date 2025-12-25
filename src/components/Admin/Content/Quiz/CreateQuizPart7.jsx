import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postCreateNewQuiz, getQuizById, putUpdateQuiz } from '../../../../services/quizService'; 
import './CreateQuizPart6.scss'; 

const CreateQuizPart7 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const quizId = params.id;

    const [quizInfo, setQuizInfo] = useState({
        title: '',
        level: 'Hard',
        timeLimit: 54,
        part: 7,
    });

    const structure = [
        { start: 147, count: 2, type: 'SINGLE' },
        { start: 149, count: 2, type: 'SINGLE' },
        { start: 151, count: 2, type: 'SINGLE' },
        { start: 153, count: 2, type: 'SINGLE' },
        { start: 155, count: 3, type: 'SINGLE' },
        { start: 158, count: 3, type: 'SINGLE' },
        { start: 161, count: 4, type: 'SINGLE' },
        { start: 165, count: 3, type: 'SINGLE' },
        { start: 168, count: 4, type: 'SINGLE' },
        { start: 172, count: 4, type: 'SINGLE' },
        { start: 176, count: 5, type: 'DOUBLE', label: "Double Passage" },
        { start: 181, count: 5, type: 'DOUBLE', label: "Double Passage" },
        { start: 186, count: 5, type: 'TRIPLE', label: "Triple Passage" },
        { start: 191, count: 5, type: 'TRIPLE', label: "Triple Passage" },
        { start: 196, count: 5, type: 'TRIPLE', label: "Triple Passage" },
    ];

    const [groups, setGroups] = useState(() => {
        return structure.map((item, index) => {
            let numberOfPassages = 1;
            if (item.type === 'DOUBLE') numberOfPassages = 2;
            if (item.type === 'TRIPLE') numberOfPassages = 3;

            return {
                id: index,
                groupTitle: `Questions ${item.start}-${item.start + item.count - 1} (${item.label || "Single Passage"})`,
                passageText: Array(numberOfPassages).fill(""), 
                questions: Array.from({ length: item.count }, (_, qIndex) => ({
                    id: item.start + qIndex,
                    number: item.start + qIndex,
                    description: '', 
                    correctAnswer: '',
                    explanation: '',
                    options: [
                        { text: '', image: '' },
                        { text: '', image: '' },
                        { text: '', image: '' },
                        { text: '', image: '' }
                    ]
                }))
            };
        });
    });

useEffect(() => {
        if (quizId) {
            fetchQuizData();
        }
        // Thêm dòng dưới đây để tắt cảnh báo vàng:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizId]);

    // ✅ FIXED: Transform flat questions back to groups structure
    const fetchQuizData = async () => {
        try {
            let res = await getQuizById(quizId);
            console.log("🔍 Raw API Response:", res); // Debug log
            
            if (res && res.data) {
                const backendData = res.data;
                console.log("📦 Backend Data:", backendData);

                // 1. Set basic info
                setQuizInfo({
                    title: backendData.title || '',
                    level: backendData.level || 'Hard',
                    timeLimit: backendData.timeLimit || 54,
                    part: 7
                });

                // 2. Transform questions array back to groups
                if (backendData.questions && backendData.questions.length > 0) {
                    const newGroups = [];
                    let questionIndex = 0;

                    structure.forEach((structItem, gIndex) => {
                        const questionsChunk = backendData.questions.slice(
                            questionIndex, 
                            questionIndex + structItem.count
                        );

                        if (questionsChunk.length > 0) {
                            // Determine number of passages
                            let numberOfPassages = 1;
                            if (structItem.type === 'DOUBLE') numberOfPassages = 2;
                            if (structItem.type === 'TRIPLE') numberOfPassages = 3;

                            // Extract passages from first question's questionText array
                            const firstQ = questionsChunk[0];
                            let passages = Array(numberOfPassages).fill("");
                            
                            if (Array.isArray(firstQ.questionText)) {
                                passages = firstQ.questionText.slice(0, numberOfPassages);
                            }

                            newGroups.push({
                                id: gIndex,
                                groupTitle: `Questions ${structItem.start}-${structItem.start + structItem.count - 1} (${structItem.label || "Single Passage"})`,
                                passageText: passages,
                                questions: questionsChunk.map((q, idx) => ({
                                    id: q.id || (structItem.start + idx),
                                    number: structItem.start + idx,
                                    // Description is the last item in questionText array
                                    description: Array.isArray(q.questionText) 
                                        ? q.questionText[q.questionText.length - 1] 
                                        : q.questionText || '',
                                    correctAnswer: q.correctAnswer || '',
                                    explanation: q.explanation || '',
                                    options: q.options || [
                                        { text: '', image: '' },
                                        { text: '', image: '' },
                                        { text: '', image: '' },
                                        { text: '', image: '' }
                                    ]
                                }))
                            });
                        }

                        questionIndex += structItem.count;
                    });

                    if (newGroups.length > 0) {
                        console.log("✅ Transformed Groups:", newGroups);
                        setGroups(newGroups);
                    }
                }
            } else {
                toast.error("Không tìm thấy bài thi!");
                navigate('/admin/manage-quiz/part/7');
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            toast.error("Lỗi khi tải dữ liệu bài thi");
        }
    };

    const handleInfoChange = (e) => setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });

    const handlePassageChange = (gIndex, pIndex, value) => {
        const newGroups = [...groups];
        newGroups[gIndex].passageText[pIndex] = value;
        setGroups(newGroups);
    };

    const handleQuestionChange = (gIndex, qIndex, field, value) => {
        const newGroups = [...groups];
        newGroups[gIndex].questions[qIndex][field] = value;
        setGroups(newGroups);
    };

    const handleOptionChange = (gIndex, qIndex, optIndex, value) => {
        const newGroups = [...groups];
        newGroups[gIndex].questions[qIndex].options[optIndex].text = value;
        setGroups(newGroups);
    };

    // ✅ FIXED: Flatten groups back to questions array (matching Part 6 format)
    const handleSubmit = async () => {
        if (!quizInfo.title) return toast.error("Vui lòng nhập tên bài thi!");
        
        for (let g of groups) {
            for (let i = 0; i < g.passageText.length; i++) {
                if (!g.passageText[i].trim()) {
                    return toast.error(`${g.groupTitle}: Nội dung đoạn văn số ${i + 1} bị thiếu`);
                }
            }
            
            for (let q of g.questions) {
                if (!q.description.trim()) return toast.error(`Câu ${q.number}: Chưa nhập nội dung câu hỏi`);
                if (!q.correctAnswer) return toast.error(`Câu ${q.number}: Chưa chọn đáp án đúng`);
            }
        }

        // Transform groups to flat questions array
        let flatQuestions = [];

        groups.forEach(g => {
            g.questions.forEach(q => {
                // Build questionText array: [passage1, passage2?, passage3?, description]
                const questionTextArray = [...g.passageText, q.description];

                flatQuestions.push({
                    questionText: questionTextArray,
                    questionImage: "",
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation,
                    point: 1
                });
            });
        });

        const payload = { 
            ...quizInfo, 
            questions: flatQuestions // Use 'questions' key like Part 6
        };

        console.log("📤 Submitting Payload:", payload);

        try {
            let res;
            if (quizId) {
                res = await putUpdateQuiz(quizId, payload);
                if (res) {
                    toast.success("Cập nhật Part 7 thành công!");
                    navigate('/admin/manage-quiz/part/7');
                }
            } else {
                res = await postCreateNewQuiz(payload);
                if (res && res.data) {
                    toast.success("Tạo bài thi Part 7 thành công!");
                    navigate('/admin/manage-quiz/part/7');
                }
            }
        } catch (error) {
            console.error("❌ Submit Error:", error);
            toast.error(error.response?.data?.message || "Lỗi server");
        }
    };

    return (
        <div className="create-quiz-part6-container">
            <div className="container pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0 text-success">
                        <i className="fa fa-book me-2"></i>
                        {quizId ? `Cập nhật đề Part 7 (ID: ${quizId})` : 'Tạo đề Part 7 (Reading Comprehension)'}
                    </h2>
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/manage-quiz/part/7')}>
                        <i className="fa fa-arrow-left me-2"></i> Quay lại
                    </button>
                </div>

                <div className="card shadow-sm mb-5 border-0">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Tên bài thi</label>
                                <input className="form-control" name="title" value={quizInfo.title} onChange={handleInfoChange} placeholder="VD: ETS 2024 Test 1 - Part 7" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-bold">Mức độ</label>
                                <select className="form-select" name="level" value={quizInfo.level} onChange={handleInfoChange}>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-bold">Thời gian (phút)</label>
                                <input type="number" className="form-control" name="timeLimit" value={quizInfo.timeLimit} onChange={handleInfoChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {groups.map((group, gIndex) => (
                    <div key={gIndex} className="group-card mb-5">
                        <div className="group-header bg-success text-white p-2 rounded-top d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{group.groupTitle}</span>
                            <span className="badge bg-light text-dark">
                                {group.passageText.length} Passages - {group.questions.length} Questions
                            </span>
                        </div>

                        <div className="group-body border border-top-0 p-3 rounded-bottom bg-white">
                            <div className="row">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <label className="fw-bold mb-2">Nội dung bài đọc:</label>
                                    <div className="passage-inputs-container" style={{ height: '600px', overflowY: 'auto', paddingRight: '5px' }}>
                                        {group.passageText.map((pText, pIndex) => (
                                            <div key={pIndex} className="mb-3">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small className="fw-bold text-muted">
                                                        {group.passageText.length > 1 ? `Passage ${pIndex + 1}` : 'Passage Content'}
                                                    </small>
                                                </div>
                                                <textarea 
                                                    className="form-control" 
                                                    style={{ 
                                                        height: group.passageText.length > 1 ? '280px' : '580px',
                                                        fontFamily: 'monospace', 
                                                        fontSize: '0.9rem',
                                                        backgroundColor: '#f8f9fa'
                                                    }}
                                                    value={pText}
                                                    onChange={(e) => handlePassageChange(gIndex, pIndex, e.target.value)}
                                                    placeholder={`Paste nội dung đoạn văn ${pIndex + 1} vào đây...`}
                                                ></textarea>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="questions-scroll-container" style={{ height: '600px', overflowY: 'auto', paddingRight: '5px' }}>
                                        {group.questions.map((q, qIndex) => (
                                            <div key={qIndex} className="card mb-3 border-secondary shadow-sm">
                                                <div className="card-header py-1 bg-light fw-bold text-secondary">
                                                    Question {q.number}
                                                </div>
                                                <div className="card-body p-2">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-bold small text-primary">Nội dung câu hỏi:</label>
                                                        <textarea 
                                                            className="form-control" 
                                                            rows="2"
                                                            placeholder="VD: What is stated about the hotel?"
                                                            value={q.description}
                                                            onChange={(e) => handleQuestionChange(gIndex, qIndex, 'description', e.target.value)}
                                                        ></textarea>
                                                    </div>

                                                    <label className="form-label fw-bold small text-muted">Các đáp án:</label>
                                                    {q.options.map((opt, oIdx) => {
                                                        const label = ['A', 'B', 'C', 'D'][oIdx];
                                                        const isSelected = q.correctAnswer === label;
                                                        return (
                                                            <div key={oIdx} className="input-group input-group-sm mb-1">
                                                                <span 
                                                                    className={`input-group-text cursor-pointer ${isSelected ? 'bg-success text-white' : ''}`}
                                                                    style={{cursor: 'pointer', width: '35px', justifyContent: 'center'}}
                                                                    onClick={() => handleQuestionChange(gIndex, qIndex, 'correctAnswer', label)}
                                                                >
                                                                    {label}
                                                                </span>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control"
                                                                    placeholder={`Option ${label}`}
                                                                    value={opt.text}
                                                                    onChange={(e) => handleOptionChange(gIndex, qIndex, oIdx, e.target.value)}
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                    
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm mt-2" 
                                                        placeholder="Giải thích đáp án (tùy chọn)..."
                                                        value={q.explanation}
                                                        onChange={(e) => handleQuestionChange(gIndex, qIndex, 'explanation', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="text-center mt-5 mb-5">
                    <button className="btn btn-warning btn-lg px-5 py-3" onClick={handleSubmit}>
                        <i className="fa fa-save me-2"></i> {quizId ? "CẬP NHẬT BÀI THI" : "LƯU BÀI THI MỚI"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizPart7;