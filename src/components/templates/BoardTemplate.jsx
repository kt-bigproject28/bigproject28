import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStore, FaShoppingCart, FaHandsHelping } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const BoardLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 8px;
  width: calc(100% - 40px); /* 부모 요소의 너비에서 좌우 여백을 뺀 값 */
  max-width: 600px; /* 최대 너비를 설정하여 웹 화면에서의 가로 확장을 제한 */
  text-decoration: none;
  color: #333;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f3f4f6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  & > svg {
    margin-right: 12px;
    color: #4aaa87;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
  color: #333;
`;

const BoardTemplate = () => {
  return (
    <Container>
      <Title>게시판 목록</Title>
      <BoardLink to="/sellboard">
        <FaStore size={24} />
        판매 게시판
      </BoardLink>
      <BoardLink to="/buyboard">
        <FaShoppingCart size={24} />
        구매 게시판
      </BoardLink>
      <BoardLink>
        <FaHandsHelping size={24} />
        품앗이 게시판
      </BoardLink>
    </Container>
  );
};

export default BoardTemplate;
