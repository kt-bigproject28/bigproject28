// apis/posts.js
import { instance } from "./instance";

export const fetchPosts = () => {
  return instance.get("/api/posts/");
};
