import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: start;
  padding: 24px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 12px;
  color: #444;
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  padding: 16px;
  z-index: 1000;
  border-bottom: 2px solid #4aaa87;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const PostItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  padding: 12px;
  transition: box-shadow 0.3s, border-color 0.3s;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 0 8px rgba(74, 170, 135, 0.3);
    border-color: #4aaa87;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 4px;
  color: #4aaa87;
`;

const PostMeta = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

const PostContent = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const BuyBoardTemplate = () => {
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
      title: "감자 구매합니다",
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

  return (
    <Container>
      <Title>구매 게시판</Title>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <StyledLink to={`/post/${post.id}`}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                작성자: {post.author} | 작성일: {post.date}
              </PostMeta>
              <PostContent>{post.content}</PostContent>
            </StyledLink>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default BuyBoardTemplate;
