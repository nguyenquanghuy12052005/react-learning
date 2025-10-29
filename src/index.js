import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORT CÁC COMPONENT
import Home from './components/Home/Home';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import VocabPage from './components/Vocab/VocabPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* ROUTE CHÍNH */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="users" element={<User />} />
            <Route path="vocab" element={<VocabPage />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-users" element={<ManageUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);