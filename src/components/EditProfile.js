import React from 'react';
import './EditProfile.css';

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <h2>개인정보 수정</h2>
      <form>
        <label>이름</label>
        <input type="text" name="name" />
        <label>이메일</label>
        <input type="email" name="email" />
        <label>비밀번호</label>
        <input type="password" name="password" />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default EditProfile;