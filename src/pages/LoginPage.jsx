import React from 'react';
import '../components/LoginPage.css'; // Update the path to match your directory structure
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>로그인</h2>
      <p>귀하의 계정에 로그인 하십시오</p>
      <form>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="예) Ravibxr802133@gmail.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">로그인</button>
        <Link to="/password-recovery">비밀번호를 잊어버렸나요?</Link>
      </form>
      <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
    </div>
  );
};

export default LoginPage;