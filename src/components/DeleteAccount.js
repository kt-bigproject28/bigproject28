import React, { useState } from 'react';
import './DeleteAccount.css';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 확인 및 탈퇴 로직 추가
    console.log('Password:', password);
  };

  return (
    <div className="delete-account">
      <h2>회원탈퇴</h2>
      <form onSubmit={handleSubmit}>
        <label>비밀번호를 다시 입력해주세요</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">탈퇴하기</button>
      </form>
      <button onClick={() => window.location.href = '/'}>홈으로 돌아가기</button>
    </div>
  );
};

export default DeleteAccount;