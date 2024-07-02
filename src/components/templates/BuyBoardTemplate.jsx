import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #444;
  padding: 16px 0;
  border-bottom: 2px solid #4aaa87;
  margin-bottom: 16px;
  text-align: center;
`;

const SearchBar = styled.input`
  font-size: 16px;
  border: 2px solid #4aaa87;
  padding: 8px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: #6dc4b0;
  }
`;

const PostList = styled.div`
  display: grid;
  gap: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #4aaa87;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: ${(props) => (props.header ? "aliceblue" : "black")};
  text-align: left;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #4aaa87;
  display: inline-block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaIcon = styled.div`
  display: flex;
  font-size: 9px;
  font-weight: 500;
  align-items: center;
  color: #black;
`;

const BuyBoardTemplate = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      title: "쌀 구매합니다",
      author: "홍길동",
      date: "2024-06-30",
      content:
        "신선한 쌀을 구매합니다. 10킬로그램 정도 필요합니다. 연락주세요.",
    },
    {
      id: 2,
      title: "감자 구매합니다 감자 구매합니다 감자 구매합니다",
      author: "김철수",
      date: "2024-06-29",
      content:
        "양질의 감자를 구매하고자 합니다. 5킬로그램 필요합니다. 연락 부탁드립니다.",
    },
    {
      id: 3,
      title: "당근 구매합니다",
      author: "이영희",
      date: "2024-06-28",
      content:
        "신선한 당근을 구매합니다. 3킬로그램 정도 필요합니다. 연락주세요.",
    },
    {
      id: 4,
      title: "고구마 구매합니다",
      author: "박민수",
      date: "2024-06-27",
      content:
        "고구마를 구매하고자 합니다. 7킬로그램 정도 필요합니다. 연락주세요.",
    },
    {
      id: 5,
      title: "양파 구매합니다",
      author: "최영희",
      date: "2024-06-26",
      content: "양파를 구매합니다. 4킬로그램 필요합니다. 연락 부탁드립니다.",
    },
    {
      id: 6,
      title: "수박 구매합니다",
      author: "김민수",
      date: "2024-06-25",
      content:
        "수박을 1통 구매하고 싶습니다. 상태 좋은 수박 필요합니다. 연락주세요.",
    },
    {
      id: 7,
      title: "토마토 구매합니다",
      author: "이철수",
      date: "2024-06-24",
      content:
        "토마토를 2kg 구매하고 싶습니다. 신선한 상태로 필요합니다. 연락주세요.",
    },
    {
      id: 8,
      title: "딸기 구매합니다",
      author: "박영희",
      date: "2024-06-23",
      content:
        "딸기를 1kg 구매하고 싶습니다. 신선한 딸기 필요합니다. 연락주세요.",
    },
    {
      id: 9,
      title: "배추 구매합니다",
      author: "최철수",
      date: "2024-06-22",
      content:
        "배추를 5포기 구매하고 싶습니다. 좋은 품질의 배추 원합니다. 연락주세요.",
    },
    {
      id: 10,
      title: "오이 구매합니다",
      author: "김영희",
      date: "2024-06-21",
      content:
        "오이를 10개 구매하고 싶습니다. 신선한 상태로 필요합니다. 연락주세요.",
    },
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Title>구매 게시판</Title>
      <SearchBar
        type="text"
        placeholder="  제목을 검색하세요"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <PostList>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>제목</TableCell>
              <TableCell header>작성자</TableCell>
              <TableCell header>작성일</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <StyledLink to={`/post/${post.id}`}>
                    <PostTitle>{post.title}</PostTitle>
                  </StyledLink>
                </TableCell>
                <TableCell>
                  <MetaIcon>{post.author}</MetaIcon>
                </TableCell>
                <TableCell>
                  <MetaIcon>{post.date}</MetaIcon>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </PostList>
    </Container>
  );
};

export default BuyBoardTemplate;
