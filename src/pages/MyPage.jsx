import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div>
      <h2>회원명</h2>
      <button onClick={() => window.location.href = '/login'}>로그아웃</button>
      <ul>
        <li><Link to="/edit-profile">개인정보 수정</Link></li>
        <li><Link to="/register-crop">작물 정보 등록</Link></li>
        <li><Link to="/my-posts">내가 쓴 글</Link></li>
        <li><Link to="/delete-account">회원탈퇴</Link></li>
      </ul>
    </div>
  );
};

export default MyPage;