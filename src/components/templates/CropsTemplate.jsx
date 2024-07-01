import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineBell } from 'react-icons/ai';
import { BsFlower3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f0f0;
  font-size: 1rem;
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const CategoryButton = styled.button`
  background-color: #a5d6a7;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 600px;
`;

const PlantButton = styled.button`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
`;

const PlantImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const PlantName = styled.h2`
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

// 팝업 스타일 정의
const PopupOverlay = styled.div`
  position: fixed;
  top: 10%;  // 위쪽 여백 추가
  bottom: 10%;  // 아래쪽 여백 추가
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  max-height: 80%;  // 팝업 높이 조정
  width: 100%;
  position: relative;
  z-index: 1001;
  overflow-y: auto;  // 내용이 넘칠 경우 스크롤 가능하게 함
`;

const PopupCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1002;
`;

// App 컴포넌트 스타일 정의
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AppTitle = styled.h1`
  margin-left: 10px;
  font-size: 1.5rem;
`;

const ListContainer = styled.div`
  overflow-y: auto;
`;

const ListItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ccc;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const App = () => {
  return (
    <AppContainer>
      <AppHeader>
        <TitleContainer>
          <BsFlower3 size={30} />
          <AppTitle>Title</AppTitle>
        </TitleContainer>
        <div>
          <AiOutlinePlus size={30} />
          <AiOutlineBell size={30} style={{ marginLeft: '10px' }} />
        </div>
      </AppHeader>
      <ListContainer>
        {Array(7).fill(null).map((_, index) => (
          <ListItem key={index}>Title</ListItem>
        ))}
      </ListContainer>
      <Footer>
        <FooterButton>🏠</FooterButton>
        <FooterButton>📸</FooterButton>
        <FooterButton>📊</FooterButton>
      </Footer>
    </AppContainer>
  );
};

const CropsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const navigateToExpectedReturnPage = () => {
    navigate("/ExpectedReturn");
  };

  return (
    <PageContainer>
      <Header>
        <Title>작물 목록</Title>
        <IconContainer>
          <Icon onClick={togglePopup}>
            <AiOutlinePlus size={30} />
          </Icon>
          <Icon>
            <AiOutlineBell size={30} />
          </Icon>
        </IconContainer>
      </Header>
      <Content>
        <CategoryButton>All</CategoryButton>
        <PlantGrid>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Chili</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Cherokee Tomato" />
            <PlantName>Tomato</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Cucumber</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Lettuce</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Watermelon</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Apple</PlantName>
          </PlantButton>
          <PlantButton onClick={navigateToExpectedReturnPage}>
            <PlantImage src="https://via.placeholder.com/100" alt="Roma Tomato" />
            <PlantName>Pear</PlantName>
          </PlantButton>
        </PlantGrid>
      </Content>

      {isPopupOpen && (
        <PopupOverlay onClick={togglePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupCloseButton onClick={togglePopup}>×</PopupCloseButton>
            <App />
          </PopupContent>
        </PopupOverlay>
      )}
    </PageContainer>
  );
};

export default CropsPage;
