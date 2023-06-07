import React, { useState } from 'react'
import styled from "styled-components";
import movies from './movies.jpg'
import searchicon from './searchicon.png'
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
import Axios from 'axios';

export const API_KEY = 'ce985e49';
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: orange;
  color: green;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 2px;
  width: 25%;
  background-color: white;
  margin-right: 25px;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 20px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

function App() {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [selectMovie, onMovieSelect] = useState();
  const fetch = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    setMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetch(e.target.value), 500);
    updateTimeoutId(timeout);
    setSearch(e.target.value);

  }
  return (
    <Container>
      <Header>

        <AppName>

          <MovieImage src={movies} />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src={searchicon} />
          <SearchInput placeholder='Search Movie' value={search} onChange={onTextChange} />
        </SearchBox>

      </Header>
      {selectMovie && <MovieInfoComponent selectMovie={selectMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {
          movieList?.length ? movieList.map((movie, index) => (<MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />)) : "No Movie Search"
        }

      </MovieListContainer>

    </Container>
  );
}

export default App;
