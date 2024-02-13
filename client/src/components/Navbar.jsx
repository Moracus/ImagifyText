import styled from "styled-components";
import Button from "./button";
import { useNavigate, useLocation } from "react-router-dom";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-item: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;
const Navbar = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  return (
    <Container>
      GEN AI
      {path[1] === "post" ? (
        <Button
          text="Explore Posts"
          leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
          onClick={() => Navigate("/post")}
          type="secondary"
        ></Button>
      ) : (
        <Button
          text="create new post"
          leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
          onClick={() => Navigate("/post")}
        ></Button>
      )}
    </Container>
  );
};
export default Navbar;
