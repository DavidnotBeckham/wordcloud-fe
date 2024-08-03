import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import MonthResult from './MonthResult';
import WordCloudComponent from './WordCloudComponent';

// 테마 설정
const theme = {
  background: '#f0f0f0',
};

// 부모 컴포넌트
const Dashboard = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    { id: 1, name: '영화1' },
    { id: 2, name: '영화2' },
  ]);

  // 특정 영화를 선택했을 때 실행되는 함수
  const handleMovieSelect = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    setSelectedMovie(movie);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <MonthResult />
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id} onClick={() => handleMovieSelect(movie.id)}>
              {movie.name}
            </MovieItem>
          ))}
        </MovieList>
        {selectedMovie && <WordCloudComponent movie={selectedMovie} />}
      </Container>
    </ThemeProvider>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  padding: 20px;
`;

const MovieList = styled.div`
  margin-top: 20px;
`;

const MovieItem = styled.div`
  cursor: pointer;
  padding: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

export default Dashboard;
