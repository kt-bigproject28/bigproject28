import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 12px;
  color: #444;
  border-bottom: 2px solid #4aaa87;
  padding-bottom: 8px;
`;

const PostMeta = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

const PostContent = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.6;
`;

const posts = [
  {
    id: 1,
    title: "쌀 구매합니다",
    author: "홍길동",
    date: "2024-06-30",
    content: "신선한 쌀을 구매합니다. 10킬로그램 정도 필요합니다. 연락주세요.",
  },
  // 나머지 게시글 생략
];

const PostDetailTemplate = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <Container>게시글을 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <PostMeta>
        작성자: {post.author} | 작성일: {post.date}
      </PostMeta>
      <PostContent>{post.content}</PostContent>
    </Container>
  );
};

export default PostDetailTemplate;
