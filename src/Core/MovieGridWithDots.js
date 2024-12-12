import React, { useState } from "react";
import {
  MovieDescription,
  MovieGridContainer,
  MovieImage,
  MovieInfo,
  MovieItem,
  MovieRating,
  MovieTitle,
} from "./HomePageStyles";
import "./MovieGridWithDots.css";
import { useNavigate } from "react-router-dom";

export const MovieGridWithDots = ({ movies, screenWidth }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 0;
  if (screenWidth < 500 && movies.length > 2) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 4;
  }

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = movies.slice(startIndex, endIndex);

  const handleDotClick = (page) => {
    setCurrentPage(page);
  };

  const handleMovieClick = (movieUrl) => {
    navigate(`/movie/${movieUrl}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const getFullImageUrl = (imagePath) => {
    const baseUrl = "https://api.indrajala.in/public";
    if (imagePath.startsWith("https://")) {
      return imagePath;
    } else {
      const cleanPath = imagePath.startsWith("/")
        ? imagePath.slice(1)
        : imagePath;
      const encodedPath = cleanPath
        .split("/")
        .map((part, index, array) => {
          return index === array.length - 1 ? encodeURIComponent(part) : part;
        })
        .join("/");
      return `${baseUrl}/${encodedPath}`;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Previous Arrow */}
      <button
        className="arrow prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &#9664;
      </button>

      {/* Movie Grid */}
      <MovieGridContainer>
        {paginatedMovies.map((movie) => (
          <MovieItem
            key={movie._id}
            onClick={() => handleMovieClick(movie.url)}
          >
            <MovieImage
              src={getFullImageUrl(movie.movieMobileImage)}
              alt={movie.movieName}
            />
            <MovieInfo>
              <MovieTitle>{movie.movieName}</MovieTitle>
              <MovieRating>{movie.rating}</MovieRating>
              <MovieDescription>{movie.description}</MovieDescription>
            </MovieInfo>
          </MovieItem>
        ))}
      </MovieGridContainer>

      {/* Next Arrow */}
      <button
        className="arrow next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &#9654;
      </button>

      {/* Dots Pagination */}
      <div className="dots-container" style={{ width: "25%" }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`dot ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handleDotClick(index + 1)}
          ></div>
        ))}
      </div>
    </div>
  );
};
