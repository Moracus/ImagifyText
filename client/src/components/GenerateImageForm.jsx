import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateAIImage, createPost } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  CreatePostLanding,
  generateImageLoading,
  setGenerateImageLoading,
  setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const generateImageFunc = async () => {
    setGenerateImageLoading(true);
    await GenerateAIImage({ prompt: post.prompt })
      .then((response) => {
        setPost({
          ...post,
          photo: `data:image/jpeg;base64,${response?.data?.photo}`,
        });
        setGenerateImageLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        console.log(error);
      });
  };
  const createPostFunc = async () => {
    setCreatePostLoading(true);
    await createPost(post)
      .then(() => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        console.log(error);
        setCreatePostLoading(false);
      });
  };
  return (
    <Form>
      <Top>
        <Title>Generate image with prompt</Title>
        <Desc>Write your prompt..</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        ></TextInput>
        <TextInput
          label="Prompt"
          placeholder="Enter Prompt"
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        ></TextInput>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Body>
      <Actions>
        <Button
          text="generate image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateImageFunc()}
        />
        <Button
          text="post image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={CreatePostLanding}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFunc()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
