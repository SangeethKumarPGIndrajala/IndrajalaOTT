import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <CardContainer>
      <Link to={`/movie/${movie.url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PosterContainer>
          <Poster src={`https://api.indrajala.in/public${movie.movieFullImage}`} alt={movie.movieName} />
        </PosterContainer>
        <DetailsContainer>
          <Title>{movie.movieName}</Title>
          <Rating>Rating: {movie.rating}</Rating>
          <Description>{movie.description}</Description>
          <Category>Category: {movie.category.join(', ')}</Category>
        </DetailsContainer>
      </Link>
    </CardContainer>
  );
};

export default MovieCard;

// (The rest of the styled components remain unchanged)

const CardContainer = styled.div`
  display: flex;
  flex-direction: ${({ theme }) => (theme.isMobile ? 'column' : 'row')};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const PosterContainer = styled.div`
  flex: 0 0 ${({ theme }) => (theme.isMobile ? '50%' : '30%')};
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const DetailsContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Rating = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0;
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0;
`;

const Category = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0;
`;