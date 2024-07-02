import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 24px;
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

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 24px;
`;

const CommentItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin-bottom: 12px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const CommentContent = styled.div`
  color: #555;
`;

const CommentForm = styled.form`
  margin-top: 24px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const CommentButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4aaa87;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e75;
  }
`;

const posts = [
  {
    id: 1,
    title: "쌀 구매합니다",
    author: "홍길동",
    date: "2024-06-30",
    content: "신선한 쌀을 구매합니다. 10킬로그램 정도 필요합니다. 연락주세요.",
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
    content: "신선한 당근을 구매합니다. 3킬로그램 정도 필요합니다. 연락주세요.",
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

const PostDetailTemplate = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const comment = {
      author: "사용자", // 실제로는 로그인 정보나 다른 식별자를 이용해야 할 수 있습니다.
      content: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

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

      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
          </CommentItem>
        ))}
      </CommentList>

      <CommentForm onSubmit={handleSubmitComment}>
        <CommentTextarea
          rows="4"
          placeholder="댓글을 작성하세요..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <CommentButton type="submit">댓글 작성</CommentButton>
      </CommentForm>
    </Container>
  );
};

export default PostDetailTemplate;
