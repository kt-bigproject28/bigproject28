import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* 배경색 설정 */
  font-size: 1rem; /* 기본 글꼴 크기 설정 */
`;

const Header = styled.div`
  width: 80%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartContainer = styled.div`
  width: 90%;
  height: 200px; /* 그래프 높이 설정 */
  background-color: #e0e0e0; /* 빈 박스 배경색 설정 */
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
`;

const PlantImage = styled.img`
  width: 10%;
  margin: 1rem 0;
`;

const Footer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  background-color: #fff;
`;

const ExpectedReturnPage = () => {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/");
  };

  const navigateToCropsPage = () => {
    navigate("/crops");
  };

  return (
    <PageContainer>
      <Header>
        <button onClick={navigateToCropsPage}>뒤로</button>
        <div>작물별 예상 수익률</div>
        <button>알림</button>
      </Header>
      
      <ChartContainer>
        {/* 빈 박스 */}
      </ChartContainer>
      
      <StatusContainer>
        <StatusItem>
          <div>나이</div>
          <div>30일</div>
        </StatusItem>
        <StatusItem>
          <div>습도 수준</div>
          <div>62%</div>
        </StatusItem>
        <StatusItem>
          <div>상태</div>
          <div>좋음</div>
        </StatusItem>
      </StatusContainer>
      
      <PlantImage src="path_to_plant_image.png" alt="식물" />
      
      <Footer>
        <button onClick={navigateToMainPage}>홈</button>
        <button>기타</button>
        <button>마이페이지</button>
      </Footer>
    </PageContainer>
  );
};

export default ExpectedReturnPage;
