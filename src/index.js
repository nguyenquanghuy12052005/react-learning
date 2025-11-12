import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORT CÁC COMPONENT
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import VocabPage from './components/Vocab/VocabPage';
import ChatApp from './components/Chat/ChatApp';
// ===== Import các trang TOEIC =====
import Listening from './components/Pages/Listening';
import Reading from './components/Pages/Reading';
import Writting from './components/Pages/Writting';
import Speaking from './components/Pages/Speaking';

// ===== Import các trang Auth =====
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import Forum from './components/Forum/Forum';
import HomePage from "./components/User/HomePage";
import ChatPage from "./components/User/ChatPage"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
  {/* ===== Phần người dùng (App chính) ===== */}
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
    <Route path="chatapp" element={<ChatApp />} />
  </Route>

  {/* ⚡ Các trang KHÔNG có header */}
  <Route path="/homepage" element={<HomePage />} />
  <Route path="/chatpage" element={<ChatPage />} />

  {/* ===== Phần quản trị (Admin) ===== */}
  <Route path="/admin" element={<Admin />}>
    <Route index element={<Dashboard />} />
    <Route path="manage-users" element={<ManageUser />} />
  </Route>
</Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
