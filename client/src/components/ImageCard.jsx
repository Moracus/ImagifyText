import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded, DeleteRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
import { deletePost } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const KEY = import.meta.env.VITE_PASSWORD;

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.primary};
  transition: opacity 0.3 ease;
  justify-content: end;
  border-radius: 6px;
  padding: 16px;
  ${Card}:hover & {
    opacity: 1;
  }
`;
const Prompt = styled.div`
  font-weight: 400px;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;
const Author = styled.div`
  font-weight: 800px;
  font-size: 15px;
  display:flex;
  gap:8px
  align-items:center;

  color: ${({ theme }) => theme.white};
`;

const ImageCard = ({ item, id }) => {
  const navigate = useNavigate();
  const [devMode, setDevMode] = useState(false);
  let devPass = localStorage.getItem("password") || "";
  useEffect(() => {
    if (devPass == KEY) {
      setDevMode(true);
    } else {
      setDevMode(false);
    }
  }, []);
  const handleDelete = async (currentId) => {
    // console.log(currentId);
    const response = await deletePost(currentId);
    const result = await response.data;
    if (result?.message) {
      navigate(0);
    }
  };
  return (
    <Card>
      <LazyLoadImage
        alt={item?.prompt}
        style={{ borderRadius: "14px" }}
        width="100%"
        src={item?.photo}
      />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Author>
            <Avatar style={{ width: "32px", height: "32px" }}>
              {item?.name[0]}
            </Avatar>
            {item?.name}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, `${item.prompt}.jpg`)}
          />
          {devMode && <DeleteRounded onClick={() => handleDelete(id)} />}
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
