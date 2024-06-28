import React from "react";
import styled from "styled-components";

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* 배경색을 변경할 수 있습니다 */
  font-size: 2rem; /* 글꼴 크기 설정 */
`;

const MainPage = () => {
  return <PageContainer>메인페이지</PageContainer>;
};

export default MainPage;
