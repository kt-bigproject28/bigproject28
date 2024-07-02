import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage'; // 메인 페이지 임포트
import LoginPage from './pages/LoginPage'; // 로그인 페이지 임포트
import SignupPage from './pages/SignupPage'; // 회원가입 페이지 임포트
import MyPage from './pages/MyPage';
import EditProfile from './components/EditProfile';
import RegisterCrop from './components/RegisterCrop';
import MyPosts from './components/MyPosts';
import DeleteAccount from './components/DeleteAccount';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/register-crop" element={<RegisterCrop />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      </Routes>
    </Router>
  );
};

export default App;