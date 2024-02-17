import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";
import { useState } from "react";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;
const Wrapper = styled.div`
  height: fit-content;
  max-width: 1200px;
  width: 100%;
  gap: 8px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({author:"",prompt:"",photo:""});
  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          CreatePostLanding={createPostLoading}
          generateImageLoading={generateImageLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
        />
        <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
