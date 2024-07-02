import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #4aaa87;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #6dc4b0;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #4aaa87;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #6dc4b0;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4aaa87;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-self: center;

  &:hover {
    background-color: #3e8e75;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 16px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #555;
  margin-right: 16px;
`;

const WritePostTemplate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [postType, setPostType] = useState("buy");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", new Date().toISOString());
    formData.append("content", content);
    formData.append("image", image);
    formData.append("postType", postType);

    // 테스트로 콘솔에 출력합니다.
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // 작성 후 초기화
    setTitle("");
    setContent("");
    setImage(null);
    setPostType("buy");
  };

  return (
    <Container>
      <Title>글 작성</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">제목</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          rows="10"
          value={content}
          onChange={handleContentChange}
          required
        />
        <Label htmlFor="image">사진 첨부</Label>
        <Input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />
        <RadioGroup>
          <RadioLabel>
            <Input
              type="radio"
              value="buy"
              checked={postType === "buy"}
              onChange={handlePostTypeChange}
            />
            구매 게시판
          </RadioLabel>
          <RadioLabel>
            <Input
              type="radio"
              value="sell"
              checked={postType === "sell"}
              onChange={handlePostTypeChange}
            />
            판매 게시판
          </RadioLabel>
        </RadioGroup>
        <Button type="submit">작성하기</Button>
      </Form>
    </Container>
  );
};

export default WritePostTemplate;
