import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  NavBar,
  NavLinks,
  NavButton,
  Content,
  Title,
  Subtitle,
  GetStartedButton,
  Footer,
  FooterLink,
  FooterText
} from './LandingPage.styles';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('jwt');
    const expiryDate = urlParams.get('exp');

    if (token && expiryDate) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiryDate', expiryDate);
      navigate('/Home');
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        navigate('/Home');
      }
    }
  }, [navigate]);

  return (
    <Container>
      <NavBar>
        <NavLinks>
          <NavButton to="/login">Login</NavButton>
          <NavButton to="/register">Register</NavButton>
        </NavLinks>
      </NavBar>
      <Content>
        <Title>Indrajala</Title>
        <Subtitle>The OTT Platform For Your Fantasies</Subtitle>
        <GetStartedButton to="/register">Get Started</GetStartedButton>
      </Content>
      <Footer>
        <FooterLink href="https://policy.indrajala.in/Terms-of-Usage" target="_blank" rel="noopener noreferrer">Terms and Usage</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Data-Policy" target="_blank" rel="noopener noreferrer">Data Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in/Refund-Policy" target="_blank" rel="noopener noreferrer">Refund Policy</FooterLink>
        <FooterLink href="https://policy.indrajala.in" target="_blank" rel="noopener noreferrer">Detailed Policy Page</FooterLink>
        <FooterText>© 2024, All rights reserved, Indrajala Movie Makers LLP</FooterText>
      </Footer>
    </Container>
  );
};

export default LandingPage;