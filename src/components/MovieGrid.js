import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Grid>
      {movies.map((movie) => (
        <GridItem key={movie._id}>
          <MovieCard movie={movie} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default MovieGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ theme }) => (theme.isMobile ? 1 : 3)}, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.medium};
`;

const GridItem = styled.div``;