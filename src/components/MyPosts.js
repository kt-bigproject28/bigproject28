import React from 'react';
import './MyPosts.css';

const MyPosts = () => {
  const posts = [
    '글 1',
    '글 2',
    '글 3',
    '글 4',
    '글 5',
    '글 6',
    '글 7',
    '글 8',
    '글 9',
    '글 10',
    '글 11',
    '글 12',
    '글 13',
    '글 14',
    '글 15'
  ];

  return (
    <div className="app-container">
      <div className="my-posts">
        <h2>내가 쓴 글</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;