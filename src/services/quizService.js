import axios from '../utils/axios.config'; 

// 1. Tạo mới Quiz
const postCreateNewQuiz = (data) => {
    return axios.post('/quizzes', data);
}

// 2. Lấy tất cả danh sách Quiz
const getAllQuiz = () => {
    return axios.get('/quizzes'); 
}

// 3. Lấy chi tiết 1 bài Quiz theo ID (Dùng cho trang Edit)
const getQuizById = (id) => {
    return axios.get(`/quizzes/${id}`);
}

// 4. Cập nhật bài Quiz (Update)
const putUpdateQuiz = (id, data) => {
    return axios.put(`/quizzes/${id}`, data);
}

// 5. Nộp bài thi (Submit)
const postSubmitQuiz = (data) => {
    return axios.post('/quizzes/submit', data);
}

// 6. Xem kết quả bài thi đã nộp
const getQuizResultById = (id) => {
    return axios.get(`/quizzes/submit/${id}`);
}

// 7. Xóa bài Quiz
const deleteQuiz = (id) => {
    return axios.delete(`/quizzes/${id}`);
}

const postUploadFile = (fileData) => {
    return axios.post('/files/upload', fileData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export { 
    postCreateNewQuiz, 
    getAllQuiz, 
    getQuizById, 
    putUpdateQuiz, 
    postSubmitQuiz, 
    getQuizResultById,
    deleteQuiz,
    postUploadFile
};