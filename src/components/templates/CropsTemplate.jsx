import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineBell, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 추가

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #fafafa;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a5d6a7; /* 더 연한 초록색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: #fff; /* 제목 색상을 흰색으로 변경 */
`;

const IconContainer = styled.div`
  position: absolute;
  right: 1rem;
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
  overflow-y: auto;
`;

const CategoryButton = styled.button`
  background-color: #a5d6a7; /* 상단바와 동일한 배경색 */
  border: none;
  border-radius: 50px; /* 둥근 모서리 */
  padding: 0.5rem 1rem; /* 여백 조정 */
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  margin-bottom: 1rem;
  width: auto; /* 너비 자동 조정 */
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
`;

const PlantButton = styled.button`
  background-color: #fff;
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 조정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const PlantImage = styled.img`
  width: 80px; /* 이미지 크기 조정 */
  height: 80px;
  object-fit: cover;
  border-radius: 10px; /* 둥근 모서리 */
  margin-bottom: 0.75rem; /* 여백 조정 */
`;

const PlusIcon = styled(AiOutlinePlus)`
  font-size: 2.5rem; /* 아이콘 크기 조정 */
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const PlantName = styled.h2`
  font-size: 1rem; /* 폰트 크기 조정 */
  margin: 0.5rem 0;
  color: #333;
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
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90%;
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
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  align-self: center;
`;

const AddButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #4CAF50;
  color: #fff;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #e57373;
  color: #fff;
  margin-bottom: 0.5rem;
  width: 100%;
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
            <AiOutlineBell size={30} color="#fff" />
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
  const [region, setRegion] = useState(""); // 지역 상태 추가
  const [cropInputs, setCropInputs] = useState([{ cropName: "", cropRatio: "" }]);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleCropChange = (index, e) => {
    const { name, value } = e.target;
    const newCropInputs = [...cropInputs];
    newCropInputs[index][name] = value;
    setCropInputs(newCropInputs);
  };

  const handleRemoveCrop = (index) => {
    const newCropInputs = cropInputs.filter((_, i) => i !== index);
    setCropInputs(newCropInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 각 작물 입력에 대해 개별적으로 API 요청
      for (let i = 0; i < cropInputs.length; i++) {
        const formData = {
          land_area_str: area,
          region: region,
          crop_name: cropInputs[i].cropName,
          crop_ratio: cropInputs[i].cropRatio
        };

        const response = await axios.post('http://127.0.0.1:8000/prediction/', formData);
        console.log(response.data);
      }

      navigateToExpectedReturnPage(); // 모든 요청이 성공한 후 이동

    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>01 재배 면적을 설정해 주세요</h2>
          <input
            type="text"
            value={area}
            onChange={handleAreaChange}
            placeholder="면적을 입력해 주세요."
            style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <span>= m²</span>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>희망 지역을 선택해 주세요</h2>
          <input
            type="text"
            value={region}
            onChange={handleRegionChange}
            placeholder="지역을 입력해 주세요."
            style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>02 희망 재배 작물을 선택해 주세요</h2>
          {cropInputs.map((input, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.5rem' }}>
              <input 
                type="text"
                name="cropName"
                value={input.cropName}
                onChange={(e) => handleCropChange(index, e)}
                placeholder="작물명을 입력해 주세요."
                style={{ padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text"
                name="cropRatio"
                value={input.cropRatio}
                onChange={(e) => handleCropChange(index, e)}
                placeholder="작물비율을 입력해 주세요."
                style={{ padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
          ))}
          <AddButton onClick={(e) => {
            e.preventDefault();
            setCropInputs([...cropInputs, { cropName: "", cropRatio: "" }]);
          }}>
            작물 추가하기
          </AddButton>
          {cropInputs.length > 1 && (
            <RemoveButton onClick={(e) => {
              e.preventDefault();
              handleRemoveCrop(cropInputs.length - 1);
            }}>
              작물 삭제하기
            </RemoveButton>
          )}
        </div>
        <NavigateButton type="submit">결과보기</NavigateButton>
      </form>
    </div>
  );
};

export default CropsPage;
