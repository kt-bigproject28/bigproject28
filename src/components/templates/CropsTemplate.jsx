import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // axios 추가
import { AiOutlineBell, AiOutlinePlus } from 'react-icons/ai'; 
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
  justify-content: center; 
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  text-align: center; 
`;

const PlantImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const PlusIcon = styled(AiOutlinePlus)`
  font-size: 2rem;
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const PlantName = styled.h2`
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
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
  width: 400px;
  max-height: 80%;
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const PopupCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const NavigateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
`;

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
          <Icon>
            <AiOutlineBell size={30} />
          </Icon>
        </IconContainer>
      </Header>
      <Content>
        <CategoryButton>All</CategoryButton>
        <PlantGrid>
          <PlantButton onClick={togglePopup}>
            <PlusIcon />
            <PlantName>MyCrops</PlantName>
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
            <CropsPopup navigateToExpectedReturnPage={navigateToExpectedReturnPage} />
          </PopupContent>
        </PopupOverlay>
      )}
    </PageContainer>
  );
};

const CropsPopup = ({ navigateToExpectedReturnPage }) => {
  const [area, setArea] = useState("");
  const [crops, setCrops] = useState([
    { name: "가을감자", region: "", hourlySales: "52,661원", salesPer3m: "7,765원" },
    { name: "가을무", region: "", hourlySales: "43,222원", salesPer3m: "7,759원" },
    { name: "가을배추", region: "", hourlySales: "41,714원", salesPer3m: "8,798원" },
    { name: "가지", region: "", hourlySales: "39,151원", salesPer3m: "29,962원" },
    { name: "토마토", region: "", hourlySales: "60,000원", salesPer3m: "10,000원" },
    { name: "고추", region: "", hourlySales: "45,000원", salesPer3m: "9,000원" },
    { name: "오이", region: "", hourlySales: "35,000원", salesPer3m: "8,000원" },
    { name: "상추", region: "", hourlySales: "25,000원", salesPer3m: "7,000원" },
    { name: "파프리카", region: "", hourlySales: "55,000원", salesPer3m: "12,000원" },
    { name: "양배추", region: "", hourlySales: "40,000원", salesPer3m: "9,500원" },
    { name: "딸기", region: "", hourlySales: "70,000원", salesPer3m: "15,000원" },
    { name: "블루베리", region: "", hourlySales: "65,000원", salesPer3m: "13,000원" },
    { name: "브로콜리", region: "", hourlySales: "50,000원", salesPer3m: "10,500원" },
    { name: "양파", region: "", hourlySales: "30,000원", salesPer3m: "6,500원" },
    { name: "마늘", region: "", hourlySales: "45,000원", salesPer3m: "8,500원" },
    { name: "배추", region: "", hourlySales: "55,000원", salesPer3m: "11,000원" },
    { name: "무", region: "", hourlySales: "35,000원", salesPer3m: "7,500원" },
    { name: "호박", region: "", hourlySales: "25,000원", salesPer3m: "5,500원" },
    { name: "멜론", region: "", hourlySales: "65,000원", salesPer3m: "14,000원" },
    { name: "수박", region: "", hourlySales: "60,000원", salesPer3m: "13,500원" },
  ]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("/api/crops"); // 실제 API 엔드포인트로 변경 필요
        setCrops(response.data);
      } catch (error) {
        console.error("Failed to fetch crops data:", error);
      }
    };

    fetchCrops();
  }, []);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2>01 재배 면적을 설정해 주세요</h2>
        <input
          type="text"
          value={area}
          onChange={handleAreaChange}
          placeholder="면적을 입력해 주세요."
        />
        <span> = m²</span>
      </div>
      <div>
        <h2>02 희망 재배 작물을 선택해 주세요</h2>
        <input type="text" placeholder="원하는 작물명을 검색해 주세요." />
        <button>검색</button>
        <table>
          <thead>
            <tr>
              <th>선택</th>
              <th>작물명</th>
              <th>지역</th>
              <th>시간당 매출</th>
              <th>3.3㎡당 매출</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{crop.name}</td>
                <td>{crop.region}</td>
                <td>{crop.hourlySales}</td>
                <td>{crop.salesPer3m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavigateButton onClick={navigateToExpectedReturnPage}>예상 수익 페이지로 이동</NavigateButton>
    </div>
  );
};

export default CropsPage;
