import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-image-gen-2tdv.onrender.com/api/",
  // baseURL: "http://localhost:8080/api",
});

export const GetPosts = async () => await API.get("/post/");
export const createPost = async (data) => await API.post("/post/", data);
export const GenerateAIImage = async (data) =>
  await API.post("/generateimage/", data);
export const deletePost = async (id) => await API.delete(`/post/${id}`);
