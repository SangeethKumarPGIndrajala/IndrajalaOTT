
import styled, { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', Arial, sans-serif;
    background-color: #0f0f0f;
    color: #ffffff;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Navbar = styled.nav`
  width: 80px;
  background-color: rgba(26, 26, 26, 0.8);
  padding: 20px 10px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease, transform 0.3s ease;
  z-index: 1000;

  @media (min-width: 768px) {
    &:hover {
      width: 200px;
    }
  }

  @media (max-width: 767px) {
    width: 200px;
    background-color: rgba(26, 26, 26, 1);
    transform: ${(props) => (props.isMobileNavOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

// Change in Logo styled component:
export const Logo = styled.img`
  width: 60px;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;   // Add some space between the logo and NavItemsContainer
  max-height: 120px;
`;




export const RedStrip = styled.div`
  width: 96%;
  height: 250px; /* Adjust height if needed */
  background-color: red;
  margin: 0 auto; /* Centers the strip */
  position: relative; /* You can change this based on positioning needs */
  top: 10px; /* Adjust to control the spacing below the Search icon */
`;

export const NillStrip = styled.div`
  width: 96%;
  height: 25px; /* Adjust height if needed */
  margin: 0 auto; /* Centers the strip */
  position: relative; /* You can change this based on positioning needs */
  top: 10px; /* Adjust to control the spacing below the Search icon */
`;

export const SubscribeButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #f40612;
  }
`;

// Change in NavItemsContainer styled component:
export const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;            // Ensure the nav items take up available space
  justify-content: flex-start;  // Make sure items start at the top
  margin-top: 20px;         // Add space between the logo and nav items
  width: 100%;              // Take full width for proper alignment
`;



export const NavItem = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    margin-left: 10px;
    display: none;
  }

  @media (min-width: 768px) {
    ${Navbar}:hover & span {
      display: inline;
    }
    ${Navbar}:hover & {
      justify-content: flex-start;
    }
  }

  @media (max-width: 767px) {
    span {
      display: inline;
    }
    justify-content: flex-start;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  transition: margin-left 0.3s ease;
  margin-left: ${props => props.isNavExpanded ? '200px' : '80px'};

  @media (max-width: 767px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.8em;
  text-align: left;
`;

export const MovieGridContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
  max-width: 100%;
  scroll-behavior: smooth;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* Adjust gap and padding for smaller screens */
  @media (max-width: 1024px) {
    gap: 15px;
    padding: 10px 15px;
  }

  @media (max-width: 767px) {
    gap: 10px;
    padding: 5px 10px;
  }
`;


export const MovieItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  height: 300px;
  background-color: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  aspect-ratio: 2 / 3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: grab;
  position: relative;

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 768px) {
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
  }

  /* Reduce size for medium screens */
  @media (max-width: 1024px) {
    width: 160px;
    min-width: 160px;
    max-width: 160px;
    height: 240px;
  }

  /* Reduce size further for small screens */
  @media (max-width: 767px) {
    width: 120px;
    min-width: 120px;
    max-width: 120px;
    height: 180px;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


export const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  overflow-y: auto;
  border-radius: 12px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (min-width: 768px) {
    ${MovieItem}:hover & {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const MovieTitle = styled.h3`
  font-size: 1.3em;
  margin-bottom: 5px;
  color: #ffffff;

  @media (max-width: 767px) {
    display: none; // Hide on mobile view
  }
`;

export const MovieRating = styled.span`
  font-size: 0.9em;
  color: #ffd700;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    display: none; // Hide on mobile view
  }
`;

export const MovieDescription = styled.p`
  font-size: 0.8em;
  color: #cccccc;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const WatchNowButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 0.9em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f40612;
  }

  @media (max-width: 767px) {
    display: none; // Hide on mobile view
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #ffffff;
  margin-top: 50px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #ff4444;
  margin-top: 50px;
`;

export const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
      outline: none;
    }

    span {
      width: 2rem;
      height: 0.25rem;
      background: #ffffff;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
    }
  }
`;

export const MobileNavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const FeaturedMovieContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
`;

export const FeaturedMovieItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  border-radius: 15px;
  overflow: hidden;
`;

export const FeaturedMovieInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  max-width: 60%;
`;

export const FeaturedMovieTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif; /* Apply Bebas Neue font */
  font-size: 88px; /* Set font size to 88px */
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 767px) {
    font-size: 35px; /* Set font size to 88px */
  }


`;


export const FeaturedMovieDescription = styled.p`
  font-family: 'Poppins', sans-serif; /* Apply Poppins Medium font */
  font-weight: 500; /* Set to Medium weight (500) */
  font-size: 14px;   /* Set font size to 14px */
  color: #ffffff;
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  display: none;
  max-width: 65%;  /* Limit the width to 42% of the screen */
  word-wrap: break-word;  /* Force text to break to a new line if it exceeds the width */

  @media (min-width: 768px) {
    display: block;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2em;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
`;

export const CarouselIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const CarouselIndicatorDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffffff;
  }
`;