import React from 'react';
import './RegisterCrop.css';

const RegisterCrop = () => {
  return (
    <div className="register-crop">
      <h2>작물 정보 등록</h2>
      <form>
        <label>토지정보</label>
        <input type="text" name="landInfo" />
        <label>작물</label>
        <input type="text" name="crop" />
        <label>면적</label>
        <input type="text" name="area" />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default RegisterCrop;