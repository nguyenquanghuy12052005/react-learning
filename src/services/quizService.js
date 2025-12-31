import axios from '../utils/axios.config'; 

// 1. Tạo mới Quiz
const postCreateNewQuiz = async (data) => {
    try {
        console.log('Creating quiz with data:', data);
        const response = await axios.post('/quizzes', data);
        console.log('Create quiz response:', response.data);
        return response;
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw error;
    }
}

// 2. Lấy tất cả danh sách Quiz
const getAllQuiz = async () => {
    try {
        console.log('Fetching all quizzes');
        const response = await axios.get('/quizzes');
        console.log('Get all quizzes response:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
}

// 3. Lấy chi tiết 1 bài Quiz theo ID (Dùng cho trang Edit)
const getQuizById = async (id) => {
    try {
        console.log('Fetching quiz by ID:', id);
        const response = await axios.get(`/quizzes/${id}`);
        console.log('Get quiz by ID response:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        throw error;
    }
}

// 4. Cập nhật bài Quiz (Update)
const putUpdateQuiz = async (id, data) => {
    try {
        console.log('Updating quiz:', id, data);
        const response = await axios.put(`/quizzes/${id}`, data);
        console.log('Update quiz response:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating quiz:', error);
        throw error;
    }
}

// 5. Nộp bài thi (Submit)
const postSubmitQuiz = async (data) => {
    try {
        console.log('Submitting quiz:', data);
        const response = await axios.post('/quizzes/submit', data);
        console.log('Submit quiz response:', response.data);
        return response;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        throw error;
    }
}

// 6. Xem kết quả bài thi đã nộp
const getQuizResultById = async (id) => {
    try {
        console.log('Fetching quiz result by ID:', id);
        const response = await axios.get(`/quizzes/submit/${id}`);
        console.log('Get quiz result response:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching quiz result:', error);
        throw error;
    }
}

// 7. Xóa bài Quiz
const deleteQuiz = async (id) => {
    try {
        console.log('Deleting quiz:', id);
        const response = await axios.delete(`/quizzes/${id}`);
        console.log('Delete quiz response:', response.data);
        return response;
    } catch (error) {
        console.error('Error deleting quiz:', error);
        throw error;
    }
}

// 8. Upload file
const postUploadFile = async (fileData) => {
    try {
        console.log('Uploading file');
        const response = await axios.post('/files/upload', fileData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        console.log('Upload file response:', response.data);
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
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