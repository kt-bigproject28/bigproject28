import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecoveryPage = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    if (step === 1) {
      try {
        const response = await axios.post('/api/password-recovery', { name, email });
        if (response.data.success) {
          setStep(2);
          setMessage('이메일로 인증번호가 발송되었습니다.');
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error during password recovery', error);
        setMessage('비밀번호 찾기 실패');
      }
    } else if (step === 2) {
      try {
        const response = await axios.post('/api/verify-code', { email, verificationCode });
        if (response.data.success) {
          setMessage('인증이 완료되었습니다. 이제 비밀번호를 재설정할 수 있습니다.');
          // 비밀번호 재설정 페이지로 이동 또는 추가 단계 처리
        } else {
          setMessage('인증번호가 일치하지 않습니다.');
        }
      } catch (error) {
        console.error('Error during code verification', error);
        setMessage('인증에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handlePasswordRecovery}>
        {step === 1 && (
          <>
            <div>
              <label>이름:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>이메일:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </>
        )}
        {step === 2 && (
          <div>
            <label>인증번호:</label>
            <input 
              type="text" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit">
          {step === 1 ? '비밀번호 찾기' : '인증번호 확인'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordRecoveryPage;