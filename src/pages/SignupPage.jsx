import React from 'react';
import '../components/SignUpPage.css'; // Update the path to match your directory structure

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h2>회원가입</h2>
      <form>
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
        <button type="submit">회원가입</button>
      </form>
      <p>이미 회원이신가요? <a href="/login">로그인하기</a></p>
    </div>
  );
};

export default SignupPage;