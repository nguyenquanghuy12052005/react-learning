import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { VocProvider } from './contexts/VocalContext.js';

// User Pages
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import Listening from './components/Pages/Listening';
import Reading from './components/Pages/Reading';
import Writting from './components/Pages/Writting';
import Speaking from './components/Pages/Speaking';
import Vocab from './components/Vocab/VocabPage';
import ChatApp from './components/User/Chat/ChatApp';
import HomePage from "./components/User/HomePage";
import UserProfile from "./components/User/UserProfile";
import CourseDetailPage from "./components/User/CourseDetailPage";
import VocabularyPage from "./components/User/VocabularyPage";
import Vocab2 from "./components/User/Vocab2";
import Forum from './components/Forum/Forum';
import ChatPage from "./components/User/ChatPage";

// TOEIC Pages
import ToeicPage from './components/ToeicTest/ToeicPage';
import TestFullPage from './components/ToeicTest/TestFullPage';
import Part1Page from './components/ToeicTest/Part1Page';
import Part2Page from './components/ToeicTest/Part2Page';
import Part3Page from './components/ToeicTest/Part3Page';
import Part4Page from './components/ToeicTest/Part4Page';
import Part5Page from './components/ToeicTest/Part5Page';
import Part6Page from './components/ToeicTest/Part6Page';
import Part7Page from './components/ToeicTest/Part7Page';

// Assignment Details
import Part1Detail from './components/Assignment/Part1Detail';
import Part2Detail from './components/Assignment/Part2Detail';
import Part3Detail from './components/Assignment/Part3Detail';
import Part4Detail from './components/Assignment/Part4Detail';
import Part5Detail from './components/Assignment/Part5Detail';
import Part6Detail from './components/Assignment/Part6Detail';
import Part7Detail from './components/Assignment/Part7Detail';
import FullTestDetail from './components/Assignment/FullTestDetail';

// Auth & Admin
import Authentication from './core/Authentication';
import AdminAuthentication from './core/AdminAuthentication'; 
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import ManageQuiz from './components/Admin/Content/ManageQuiz.jsx';
import QuizListByPart from './components/Admin/Content/QuizListByPart.jsx';

// Admin Quiz Creation Pages
import CreateQuizPart1 from './components/Admin/Content/Quiz/CreateQuizPart1'; 
import CreateQuizPart2 from './components/Admin/Content/Quiz/CreateQuizPart2'; 
import CreateQuizPart3 from './components/Admin/Content/Quiz/CreateQuizPart3'; 
import CreateQuizPart4 from './components/Admin/Content/Quiz/CreateQuizPart4';
import CreateQuizPart5 from './components/Admin/Content/Quiz/CreateQuizPart5'; 
import CreateQuizPart6 from './components/Admin/Content/Quiz/CreateQuizPart6'; 
import CreateQuizPart7 from './components/Admin/Content/Quiz/CreateQuizPart7';
import CreateFullTest from './components/Admin/Content/Quiz/CreateFullTest';
import { ChatContext, ChatProvider } from './contexts/ChatContext.js';

const PartPlaceholder = ({ partTitle }) => (
  <div
    className="toeic-main"
    style={{
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    <h2 style={{ color: '#007bff' }}>{partTitle}</h2>
    <p>
      Đây là trang luyện tập cho <strong>{partTitle}</strong>.
    </p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AuthProvider>
      <PostProvider>
        <VocProvider>
          <ChatProvider>
          <React.StrictMode>
            <BrowserRouter>
              <Routes>
                {/* USER ROUTES */}
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="listening" element={<Listening />} />
                  <Route path="reading" element={<Reading />} />
                  <Route path="writting" element={<Writting />} />
                  <Route path="speaking" element={<Speaking />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route
                    path="chatapp"
                    element={
                      <Authentication>
                        <ChatApp />
                      </Authentication>
                    }
                  />
                  <Route path="vocab" element={<Vocab />} />
                </Route>

                <Route
                  path="/homepage"
                  element={
                    <Authentication>
                      <HomePage />
                    </Authentication>
                  }
                />
                <Route path="/chatpage" element={<ChatPage />} />
                <Route
                  path="/userprofile"
                  element={
                    <Authentication>
                      <UserProfile />
                    </Authentication>
                  }
                />
                <Route path="/vocab2" element={<Vocab2 />} />
                <Route path="/course" element={<CourseDetailPage />} />
                <Route path="/vocab-page" element={<VocabularyPage />} />
                <Route path="/toeic-prep" element={<ToeicPage />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/test-full" element={<TestFullPage />} />

                {/* TOEIC PARTS */}
                <Route path="/toeic/part1" element={<Part1Page />} />
                <Route path="/toeic/part2" element={<Part2Page />} />
                <Route path="/toeic/part3" element={<Part3Page />} />
                <Route path="/toeic/part4" element={<Part4Page />} />
                <Route path="/toeic/part5" element={<Part5Page />} />
                <Route path="/toeic/part6" element={<Part6Page />} />
                <Route path="/toeic/part7:id" element={<Part7Page />} />

                {/* ASSIGNMENT DETAILS */}
                <Route path="/part1/detail/:id" element={<Part1Detail />} />
                <Route path="/part2/detail/:id" element={<Part2Detail />} />
                <Route path="/part3/detail/:id" element={<Part3Detail />} />
                <Route path="/part4/detail/:id" element={<Part4Detail />} />
                <Route path="/part5/detail/:id" element={<Part5Detail />} />
                <Route path="/part6/detail/:id" element={<Part6Detail />} />
                <Route path="/part7/detail/:id" element={<Part7Detail />} />
                <Route
                  path="/fulltest/detail/:id"
                  element={<FullTestDetail />}
                />

                <Route path="/toeic">
                  <Route
                    index
                    element={
                      <PartPlaceholder partTitle="Part 1: Photographs" />
                    }
                  />
                </Route>

                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/adminregister" element={<AdminRegister />} />

                {/* ADMIN ROUTES */}
                <Route
                  path="/admin"
                  element={
                    <AdminAuthentication>
                      <Admin />
                    </AdminAuthentication>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="manage-users" element={<ManageUser />} />
                  <Route path="manage-quiz" element={<ManageQuiz />} />
                  <Route
                    path="manage-quiz/part/:partNumber"
                    element={<QuizListByPart />}
                  />

                  {/* CREATE QUIZ */}
                  <Route
                    path="create-quiz-part1"
                    element={<CreateQuizPart1 />}
                  />
                  <Route
                    path="create-quiz-part2"
                    element={<CreateQuizPart2 />}
                  />
                  <Route
                    path="create-quiz-part3"
                    element={<CreateQuizPart3 />}
                  />
                  <Route
                    path="create-quiz-part4"
                    element={<CreateQuizPart4 />}
                  />
                  <Route
                    path="create-quiz-part5"
                    element={<CreateQuizPart5 />}
                  />
                  <Route
                    path="create-quiz-part6"
                    element={<CreateQuizPart6 />}
                  />
                  <Route
                    path="create-quiz-part7"
                    element={<CreateQuizPart7 />}
                  />
                  <Route
                    path="create-full-test"
                    element={<CreateFullTest />}
                  />

                  {/* UPDATE QUIZ */}
                  <Route
                    path="update-quiz-part1/:id"
                    element={<CreateQuizPart1 />}
                  />
                  <Route
                    path="update-quiz-part2/:id"
                    element={<CreateQuizPart2 />}
                  />
                  <Route
                    path="update-quiz-part3/:id"
                    element={<CreateQuizPart3 />}
                  />
                  <Route
                    path="update-quiz-part4/:id"
                    element={<CreateQuizPart4 />}
                  />
                  <Route
                    path="update-quiz-part5/:id"
                    element={<CreateQuizPart5 />}
                  />
                  <Route
                    path="update-quiz-part6/:id"
                    element={<CreateQuizPart6 />}
                  />
                  <Route
                    path="update-quiz-part7/:id"
                    element={<CreateQuizPart7 />}
                  />
                  <Route
                    path="update-quiz-part0/:id"
                    element={<CreateFullTest />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </React.StrictMode>
          </ChatProvider>
        </VocProvider>
      </PostProvider>
    </AuthProvider>
  </Provider>
);
