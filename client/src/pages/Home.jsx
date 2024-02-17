import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { GetPosts } from "../api";

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
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;
const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width) {
    font-size: 22px;
  }
`;
const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;
const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 689px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilterdPosts] = useState([]);
  const getPost = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setLoading(false);

        setPosts(res?.data?.data);
        setFilterdPosts(res?.data?.data);
        console.log(filteredPosts);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  //search;
  useEffect(() => {
    if (!search) {
      setFilterdPosts(posts);
    }
    const searchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toString().toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toString().toLowerCase());
      return promptMatch || authorMatch;
    });
    if (search) {
      setFilterdPosts(searchFilteredPosts);
    }
  }, [posts, search]);
  return (
    <Container>
      <Headline>
        Explore popular posts in the community!!
        <Span>.Generated with ai.</Span>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPosts.length === 0 ? (
              <>no post found</>
            ) : (
              <>
                {filteredPosts
                  .slice()
                  .reverse()
                  .map((item, index) => {
                    return <ImageCard key={index} item={item} />;
                  })}
              </>
            )}
          </CardWrapper>
        )}
      </Wrapper>
      <div>
        <a href="https://github.com/moracus">made by harsh sharma</a>
      </div>
    </Container>
  );
};

export default Home;
