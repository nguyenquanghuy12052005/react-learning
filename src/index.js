import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORT CÁC TRANG
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import VocabPage from './components/Vocab/VocabPage';
import ChatApp from './components/User/Chat/ChatApp';
import Listening from './components/Pages/Listening';
import Reading from './components/Pages/Reading';
import Writting from './components/Pages/Writting';
import Speaking from './components/Pages/Speaking';
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import Forum from './components/Forum/Forum';

// CÁC TRANG USER CHÍNH (CÓ SIDEBAR)
import HomePage from "./components/User/HomePage";
import Vocab2 from "./components/User/Vocab2";
import UserProfile from "./components/User/UserProfile";  
// của thiên
import ToeicPage from './components/ToeicTest/ToeicPage';
import TestFullPage from './components/ToeicTest/TestFullPage';
import Part1Page from './components/ToeicTest/Part1Page';
import Part2Page from './components/ToeicTest/Part2Page';
import Part3Page from './components/ToeicTest/Part3Page';
import Part4Page from './components/ToeicTest/Part4Page';
import Part5Page from './components/ToeicTest/Part5Page';
import Part6Page from './components/ToeicTest/Part6Page';
import Part7Page from './components/ToeicTest/Part7Page';
import Part1Detail from './components/Assignment/Part1Detail';
import Part2Detail from './components/Assignment/Part2Detail';
import Part3Detail from './components/Assignment/Part3Detail';
import Part4Detail from './components/Assignment/Part4Detail';
import Part5Detail from './components/Assignment/Part5Detail';
import Part6Detail from './components/Assignment/Part6Detail';
import Part7Detail from './components/Assignment/Part7Detail';
import FullTestDetail from './components/Assignment/FullTestDetail';



// === Component placeholder cho TOEIC Part ===
const PartPlaceholder = ({ partTitle }) => (
  <div className="toeic-main" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h2 style={{ color: '#007bff' }}>{partTitle}</h2>
    <p>Đây là trang luyện tập cho <strong>{partTitle}</strong>. Hãy tạo component riêng và import nếu muốn.</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* === TẤT CẢ TRANG CHÍNH ĐỀU DÙNG LAYOUT APP (có Sidebar) === */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="vocab" element={<VocabPage />} />
            <Route path="listening" element={<Listening />} />
            <Route path="reading" element={<Reading />} />
            <Route path="writting" element={<Writting />} />
            <Route path="speaking" element={<Speaking />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forum" element={<Forum />} />
          </Route>

          {/* === ChatApp KHÔNG DÙNG APP, KHÔNG HEADER/SIDEBAR === */}
          <Route path="/chatapp" element={<ChatApp />} />

          {/* === 4 TRANG USER CHÍNH – BÂY GIỜ ĐỀU CÓ SIDEBAR === */}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/vocab2" element={<Vocab2 />} />
          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/toeic-prep" element={<ToeicPage />} />
          <Route path="/test-full" element={<TestFullPage />} />
          <Route path="/toeic/part1" element={<Part1Page />} />
          <Route path="/toeic/part2" element={<Part2Page />} />
          <Route path="/toeic/part3" element={<Part3Page />} />
          <Route path="/toeic/part4" element={<Part4Page />} />
          <Route path="/toeic/part5" element={<Part5Page />} />
          <Route path="/toeic/part6" element={<Part6Page />} />
          <Route path="/toeic/part7" element={<Part7Page />} />


          <Route path="/part1/detail/:id" element={<Part1Detail />} />
          <Route path="/part2/detail/:id" element={<Part2Detail />} />
          <Route path="/part3/detail/:id" element={<Part3Detail />} />
          <Route path="/part4/detail/:id" element={<Part4Detail />} />
          <Route path="/part5/detail/:id" element={<Part5Detail />} />
          <Route path="/part6/detail/:id" element={<Part6Detail />} />
          <Route path="/part7/detail/:id" element={<Part7Detail />} />
          <Route path="/fulltest/detail/:id" element={<FullTestDetail />} />


          {/* === TOEIC ROUTE SỬ DỤNG PART PLACEHOLDER === */}
          <Route path="/toeic">
            {/* Trang mặc định /toeic */}
            <Route index element={<PartPlaceholder partTitle="Part 1: Photographs" />} />
          </Route>

          {/* === Admin route === */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-users" element={<ManageUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
