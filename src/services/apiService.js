import axios from '../utils/axios.config'; 
//  Hàm tạo mới 
const postCreateNewQuiz = (data) => {
    return axios.post('/api/quizzes', data);
}

// 
// \
const getAllQuiz = () => {
    return axios.get('/api/quizzes'); 
}

// 3. Export cả 2 hàm ra
export { postCreateNewQuiz, getAllQuiz };