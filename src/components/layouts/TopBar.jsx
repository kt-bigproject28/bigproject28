import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const TopBars = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const TopBarButton = styled.button`
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #4aaa87;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3d896e;
  }

  &:focus {
    outline: none;
  }
`;

const TopBar = ({ isLoggedIn, logout, navigate }) => {
  return (
    <TopBars>
      <div>꾼꾼 농사꾼</div>
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
