import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const TopBars = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  padding: 12px;
  border-bottom: 1px solid #c8c5c5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;

  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #4aaa87;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const TopBarButton = styled.button`
  padding: 8px 20px;
  background-color: #4aaa87;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TopBar = ({ isLoggedIn, logout, navigate }) => {
  return (
    <TopBars>
      <Logo>ㅇㅇ 서비스</Logo>
      <RightSection>
        {isLoggedIn ? (
          <TopBarButton onClick={logout}>로그아웃</TopBarButton>
        ) : (
          <TopBarButton onClick={() => navigate("/login")}>로그인</TopBarButton>
        )}
      </RightSection>
    </TopBars>
  );
};

export default TopBar;
