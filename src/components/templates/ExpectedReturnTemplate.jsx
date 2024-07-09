import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f4f8;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #a5d6a7; /* light green */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

const Title = styled.div`
  color: #fff;
  font-size: 1.5rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 1rem 0;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  flex: 1;
`;

const LargeBox = styled(Box)`
  flex-basis: 100%;
  height: 300px;
`;

const WideBox = styled(Box)`
  flex-basis: 48%;
  height: 300px;
`;

const Footer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #4CAF50;
`;

const ExpectedReturnTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chartData, setChartData] = useState(null);
  const [plantStatus, setPlantStatus] = useState({
    age: null,
    humidity: null,
    status: null
  });
  const [cropName, setCropName] = useState(location.state?.cropName || '');
  const [cropData, setCropData] = useState('');
  const [areaData, setAreaData] = useState('');
  const [wholesalePrediction, setWholesalePrediction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sampleData = {
          chartData: { /* 차트 데이터 샘플 */ },
          plantStatus: {
            age: '2 years',
            humidity: '50%',
            status: 'Healthy'
          },
          cropData: 'Sample Crop Data',
          areaData: 'Sample Area Data',
          wholesalePrediction: 'Sample Wholesale Prediction'
        };

        setChartData(sampleData.chartData);
        setPlantStatus(sampleData.plantStatus);
        setCropData(sampleData.cropData);
        setAreaData(sampleData.areaData);
        setWholesalePrediction(sampleData.wholesalePrediction);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToMainPage = () => {
    navigate("/");
  };

  const navigateToCropsPage = () => {
    navigate("/crops");
  };

  return (
    <PageContainer>
      <Header>
        <HeaderButton onClick={navigateToCropsPage}>뒤로</HeaderButton>
        <Title>작물별 예상 수익률</Title>
        <HeaderButton>알림</HeaderButton>
      </Header>

      <SectionContainer>
        <Box>{cropData}</Box>
        <Box>{areaData}</Box>
        <Box>{wholesalePrediction}</Box>
        <Box>기타 정보 1</Box>
        <LargeBox>차트 데이터</LargeBox>
        <WideBox>세부 정보 1</WideBox>
      </SectionContainer>

      <Footer>
        <FooterButton onClick={navigateToMainPage}>홈</FooterButton>
        <FooterButton>기타</FooterButton>
        <FooterButton>마이페이지</FooterButton>
      </Footer>
    </PageContainer>
  );
};

export default ExpectedReturnTemplate;
