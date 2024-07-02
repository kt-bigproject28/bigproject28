import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: grid;
  gap: 2rem;
  border: 2px solid #4aaa87; /* 테두리 설정 */
`;

const MainTemplate = () => {
  return (
    <Container>
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </Container>
  );
};

export default MainTemplate;
