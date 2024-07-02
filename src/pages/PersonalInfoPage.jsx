import React from 'react';
import './PersonalInfoPage.css';

const PersonalInfoPage = () => {
  return (
    <div className="personal-info-page">
      <h2>개인정보 수정</h2>
      <form>
        <div className="form-group">
          <label htmlFor="profile-pic">사진 수정</label>
          <input type="file" id="profile-pic" />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default PersonalInfoPage;