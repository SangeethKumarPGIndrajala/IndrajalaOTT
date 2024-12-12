import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Lander.jpg'; // Import the background image

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(40, 40, 40, 0.7)),
              url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const NavBar = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
`;

export const NavButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #ff69b4;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #ff1493;
  }
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

export const Title = styled.h1`
  font-size: 4rem;
  color: #ff69b4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const GetStartedButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #ff69b4;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #ff1493;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
`;

export const FooterLink = styled.a`
  color: #ff69b4;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  margin-top: 1rem;
  color: #fff;
`;