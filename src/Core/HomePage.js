import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMovies,
  toptrending,
  topfiveMovies,
  upcomming,
  fetchAds,
} from "../utils/api";
import {
  GlobalStyle,
  AppContainer,
  Navbar,
  NavItem,
  MainContent,
  SectionTitle,
  MovieGridContainer,
  MovieItem,
  MovieImage,
  MovieInfo,
  MovieTitle,
  MovieRating,
  MovieDescription,
  WatchNowButton,
  LoadingMessage,
  ErrorMessage,
  HamburgerButton,
  MobileNavOverlay,
  ContentWrapper,
  NavItemsContainer,
  Logo,
  RedStrip,
  NillStrip,
  SubscribeButton,
  FeaturedMovieContainer,
  FeaturedMovieItem,
  FeaturedMovieInfo,
  CarouselIndicator,
  CarouselIndicatorDot,
  FeaturedMovieTitle,
  FeaturedMovieDescription,
  ScrollButton,
} from "./HomePageStyles";

import homeIcon from "../assets/Home.png";
import Profile from "../assets/Profile.png";
import Search from "../assets/Search.png";
import logo from "../assets/logo.png";
import trending from "../assets/trending.png";
import upcoming from "../assets/upcoming.png";
import topfive from "../assets/topfive.png";
import { MovieGridWithDots } from "./MovieGridWithDots";
import AdCarousel from "./AdCarousel";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [hoverMovies, setHoverMovies] = useState([]);
  const [CorrosilDesk, setCorrosilDesk] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]); // Define trendingMovies and setTrendingMovies
  const [topFiveMovies, setTopFiveMovies] = useState([]); // Add this line to handle Top Five movies data
  const [upcomingMovies, setUpcomingMovies] = useState([]); // Add state for upcoming movies
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentFeaturedMovie, setCurrentFeaturedMovie] = useState(0);
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Listen for the resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("jwt");
    const expiryDate = urlParams.get("exp");

    if (token && expiryDate) {
      // Save the token and expiry date to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("expiryDate", expiryDate);
    }

    const fetchData = async () => {
      try {
        const [
          moviesData,
          hoverMoviesData,
          trendingMoviesData,
          topFiveMoviesData,
          upcomingMoviesData,
          adData,
        ] = await Promise.all([
          fetchMovies(),
          fetchMovies(), // Fetch Corrosil desktop movies
          toptrending(), // Fetch trending movies
          topfiveMovies(), // Fetch top five movies here
          upcomming(), // Call the upcomming API
          fetchAds(), // Fetch ads data
        ]);
        // console.log("Ad data:", adData?.advertisements);
        setAds(adData?.advertisements);
        setMovies(moviesData);
        setCorrosilDesk(moviesData); // Set Corrosil desktop movies
        setHoverMovies(hoverMoviesData);
        setTrendingMovies(trendingMoviesData); // Set trending movies state
        setTopFiveMovies(topFiveMoviesData); // Set top five movies state
        setUpcomingMovies(upcomingMoviesData); // Set upcoming movies data

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsSubscribed(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.indrajala.in/api/user/checkexp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (response.ok && data.isValid) {
        setIsSubscribed(true); // Token is valid
      } else {
        setIsSubscribed(false); // Token has expired
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setIsSubscribed(false);
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

  const handleMovieClick = (movieUrl) => {
    navigate(`/movie/${movieUrl}`);
  };

  const handleFeaturedMovieClick = (index) => {
    // console.log("Navigating to:", CorrosilDesk[index]);
    navigate(`/movie/${CorrosilDesk[index].url}`);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleSubscribe = () => {
    navigate("/subscribe");
  };

  const handleWheel = (e) => {
    // Prevent page scrolling
    // e.preventDefault();
    const container = e.currentTarget;
    const scrollAmount = e.deltaY;
    container.scrollLeft += scrollAmount;
  };

  const handleLogout = () => {
    // Remove the token and expiryDate from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");

    // Redirect to the home page
    window.location.href = "/";
  };

  const handleFeaturedMovieChange = (index) => {
    setCurrentFeaturedMovie(index);
  };

  const scrollFeaturedMovie = (direction) => {
    if (direction === "left") {
      setCurrentFeaturedMovie((prev) =>
        prev === 0 ? topFiveMovies.length - 1 : prev - 1
      );
    } else {
      setCurrentFeaturedMovie((prev) =>
        prev === topFiveMovies.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Change featured movie every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedMovie(
        (prevIndex) => (prevIndex + 1) % CorrosilDesk.length
      );
    }, 3000); // Change movie every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, [topFiveMovies.length]);

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // console.log("Hover movies",hoverMovies);

  // // console.log("Movies data",moviesData);

  // // console.log("Trending movies", trendingMovies);

  // console.log("Carousel movies", CorrosilDesk);

  // console.log("Top five movies", topFiveMovies);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HamburgerButton
          onClick={toggleMobileNav}
          style={
            screenWidth >= 768 ? { display: "none" } : { display: "block" }
          }
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20 7L4 7"
                stroke="#fafafa"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M20 12L4 12"
                stroke="#fafafa"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M20 17L4 17"
                stroke="#fafafa"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
        <Navbar
          onMouseEnter={() => setIsNavExpanded(true)}
          onMouseLeave={() => setIsNavExpanded(false)}
          isMobileNavOpen={isMobileNavOpen}
        >
          {!isSubscribed && (
            <SubscribeButton onClick={handleSubscribe}>
              Subscribe Now
            </SubscribeButton>
          )}
          <Logo src={logo} alt="Logo" />
          <NavItemsContainer>
            <NavItem>
              <img src={homeIcon} alt="" />
              <span aria-label="Home">Home</span>
            </NavItem>
            <NavItem
              onClick={() => navigate("/Profile")}
              style={{ cursor: "pointer" }}
            >
              <img src={Profile} alt="Profile" />
              <span aria-label="Profile">Profile</span>
            </NavItem>
            <NavItem>
              <img src={Search} alt="" />
              <span aria-label="Search">Search</span>
            </NavItem>
            <RedStrip /> {/* Red tape element */}
            <NillStrip />
            <SubscribeButton onClick={handleLogout}>Logout</SubscribeButton>
          </NavItemsContainer>
        </Navbar>
        {isMobileNavOpen && <MobileNavOverlay onClick={toggleMobileNav} />}
        <MainContent isNavExpanded={isNavExpanded}>
          <ContentWrapper>
            <FeaturedMovieContainer
              style={{
                width: "100%",
              }}
            >
              <ScrollButton
                onClick={() => scrollFeaturedMovie("left")}
                direction="left"
                aria-label="Previous featured movie"
              >
                &lt;
              </ScrollButton>
              {CorrosilDesk.map((movie, index) => {
                // console.log(`Index: ${index}, URL: ${movie.url}`);
                // console.log("Current Featured Movie:", currentFeaturedMovie);

                return (
                  <FeaturedMovieItem
                    key={movie._id}
                    onClick={() =>
                      handleFeaturedMovieClick(currentFeaturedMovie)
                    }
                    isActive={index === currentFeaturedMovie}
                  >
                    <MovieImage
                      src={getFullImageUrl(movie.smallMovieImage)}
                      alt={movie.movieName}
                    />
                    <FeaturedMovieInfo>
                      <FeaturedMovieTitle>{movie.movieName}</FeaturedMovieTitle>
                      <MovieRating>
                        {" "}
                        <b> Rating </b> &nbsp;&nbsp; {movie.rating}
                      </MovieRating>
                      <br></br>
                      <span>{movie.category.join(", ")}</span>
                      <FeaturedMovieDescription>
                        {movie.description}
                      </FeaturedMovieDescription>
                    </FeaturedMovieInfo>
                  </FeaturedMovieItem>
                );
              })}

              <ScrollButton
                onClick={() => scrollFeaturedMovie("right")}
                direction="right"
                aria-label="Next featured movie"
              >
                &gt;
              </ScrollButton>
            </FeaturedMovieContainer>

            <CarouselIndicator style={{ width: "100%" }}>
              {CorrosilDesk.map((_, index) => (
                <CarouselIndicatorDot
                  key={index}
                  isActive={index === currentFeaturedMovie}
                  onClick={() => handleFeaturedMovieChange(index)}
                />
              ))}
            </CarouselIndicator>

            {/*-------------------.---- INDIA PAK BORDER NO WAY YOU TOUCH HERE -------------------  */}

            {/*-------------- Trending Page Wala Code Snip Start Here  ----- API Is been fetched  */}

            <SectionTitle>
              <img src={trending} alt="Trending" />
            </SectionTitle>
            {ads?.trendingAd && ads?.trendingAd.length > 0 && (
              <AdCarousel ads={ads?.trendingAd} screenWidth={screenWidth} />
            )}
            <marquee behaviour="scroll" direction="left">
              <p>
                <b>
                Incase of any failure related to Indrajala subscription, kindly logout and login again. If the
                issue persists, contact us at{" "}
                <a href="tel:919995472709" style={{textDecoration:"none", color:"white"}}>+91-9995472709</a>
                </b>
              </p>
            </marquee>

            <MovieGridWithDots
              movies={trendingMovies}
              screenWidth={screenWidth}
            />

            {/*-------------- Trending Page Wala Code Snip End Here  -----No Error Here don't touch unless necesery  */}

            {/*-------------------.---- INDIA PAK BORDER NO WAY YOU TOUCH HERE -------------------  */}

            <br />

            {/*-------------- Upcomming Section Code Start Here .......  */}
            <SectionTitle>
              <img src={upcoming} alt="Upcoming" />
            </SectionTitle>
            {ads?.upcomingAd && ads?.upcomingAd.length > 0 && (
              <AdCarousel ads={ads?.upcomingAd} screenWidth={screenWidth} />
            )}

            <MovieGridWithDots
              movies={upcomingMovies}
              screenWidth={screenWidth}
            />

            {/*-------------- Upcomming Section Code  End Here.......  */}

            <br />

            {/*-------------------.---- INDIA PAK BORDER NO WAY YOU TOUCH HERE -------------------  */}

            {/*-------------- Top Five Section Code  Start Here.......  */}
            <SectionTitle>
              <img src={topfive} alt="Top 5" />
            </SectionTitle>
            {ads?.topFiveAd && ads?.topFiveAd.length > 0 && (
              <AdCarousel ads={ads?.topFiveAd} screenWidth={screenWidth} />
            )}
            <MovieGridWithDots
              movies={topFiveMovies}
              screenWidth={screenWidth}
            />

            {/*-------------- Top Five Section Code  End Here.......  */}
            <br />
          </ContentWrapper>
        </MainContent>
      </AppContainer>
    </>
  );
};

export default HomePage;
