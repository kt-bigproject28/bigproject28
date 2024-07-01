import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  align-items: center;
  padding-left: 16px;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 40px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
  color: #333;
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  padding: 16px;
  width: 100%;
  z-index: 1000;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  overflow-y: auto; 
    100vh - 120px
  ); /* 화면 높이에서 제목과 하단 여백을 뺀 값으로 설정 */
`;

const PostItem = styled.li`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 16px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const PostMeta = styled.div`
  font-size: 14px;
  color: #666;
`;

const PostContent = styled.p`
  color: #333;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 글 내용을 최대 2줄로 제한 */
  -webkit-box-orient: vertical;
`;

const SellBoardTemplate = () => {
  const posts = [
    {
      id: 1,
      title: "쌀 판매합니다",
      author: "홍길동",
      date: "2024-06-30",
      content:
        "신선한 쌀을 저렴한 가격에 판매합니다. 10킬로그램 당 30,000원에 드립니다. 원하시는 분은 연락주세요.",
    },
    {
      id: 2,
      title: "감자 판매합니다",
      author: "김철수",
      date: "2024-06-29",
      content:
        "고구마를 1kg 2,000 원에 판매합니다. 상태는 양호합니다. 구매하실 분은 연락주세요.",
    },
    {
      id: 3,
      title: "당근 판매합니다",
      author: "이영희",
      date: "2024-06-28",
      content:
        "당근을 저렴한 가격에 판매합니다. 5kg 당 10,000원에 드립니다. 신선하고 맛있는 당근입니다. 관심 있으신 분은 연락주세요.",
    },
    {
      id: 4,
      title: "고구마 판매합니다",
      author: "박민수",
      date: "2024-06-27",
      content:
        "고구마를 10킬로그램 당 20,000원에 판매합니다. 농약을 전혀 사용하지 않은 청정 고구마입니다. 구매하실 분은 빠르게 연락주세요.",
    },
    {
      id: 5,
      title: "양파 판매합니다",
      author: "최영희",
      date: "2024-06-26",
      content:
        "양파를 저렴하게 판매합니다. 5kg 당 7,000원에 드립니다. 맛 좋고 신선한 양파입니다. 구매하실 분은 언제든지 연락주세요.",
    },
    {
      id: 6,
      title: "수박 판매합니다",
      author: "김민수",
      date: "2024-06-25",
      content:
        "시원한 수박을 1통에 15,000원에 판매합니다. 달고 신선한 수박입니다. 더운 여름철 시원한 수박을 맛보세요.",
    },
    {
      id: 7,
      title: "토마토 판매합니다",
      author: "이철수",
      date: "2024-06-24",
      content:
        "토마토를 2kg 5,000원에 판매합니다. 신선하고 맛있는 토마토입니다. 언제든지 구매하실 수 있습니다.",
    },
    {
      id: 8,
      title: "딸기 판매합니다",
      author: "박영희",
      date: "2024-06-23",
      content:
        "딸기를 500g 4,000원에 판매합니다. 달고 맛있는 딸기입니다. 구매하실 분은 빠르게 연락주세요.",
    },
    {
      id: 9,
      title: "배추 판매합니다",
      author: "최철수",
      date: "2024-06-22",
      content:
        "배추를 1포기 3,000원에 판매합니다. 신선하고 건강한 배추입니다. 구매하실 분은 언제든지 연락주세요.",
    },
    {
      id: 10,
      title: "오이 판매합니다",
      author: "김영희",
      date: "2024-06-21",
      content:
        "오이를 저렴하게 판매합니다. 10개에 3,000원에 드립니다. 맛 좋고 신선한 오이입니다. 구매하실 분은 빠르게 연락주세요.",
    },
  ];

  return (
    <Container>
      <Title>판매 게시판</Title>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
              작성자: {post.author} | 작성일: {post.date}
            </PostMeta>
            <PostContent>{post.content}</PostContent>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default SellBoardTemplate;
