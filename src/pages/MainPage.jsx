import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-size: 2rem;
`;

const MainPage = () => {
  return (
    <PageContainer>
      메인페이지
      <nav>
        <ul>
          <li><Link to="/signup">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
        </ul>
      </nav>
    </PageContainer>
  );
};

export default MainPage;