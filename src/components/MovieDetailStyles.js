// MovieDetailStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  color: #fff;
  background-color: #000;
  font-family: 'Times New Roman', Times, serif;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    content: ${({ smallSrc }) => `url(${smallSrc})`};
  }
`;

export const Logo = styled.img`
  position: absolute;
  left: 5%;
  transform: translate(0%, -50%);
  width: 30%;
  height: auto;
  top: 25%;

  @media (max-width: 768px) {
    top: 20%;
  }
`;

export const DetailsContainer = styled.div`
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    text-align: center;
  }

  position: absolute;
  top: 50%;
  left: 7%;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Rating = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const Duration = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const AgeLimit = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const Separator = styled.span`
  margin: 0 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Description = styled.p`
  margin: 12px 0;
  font-weight: bold;
`;

export const Starring = styled.p`
  margin: 12px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  gap: 16px; // Add space between buttons

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column; // Stack buttons vertically on mobile
    align-items: center;
  }
`;

export const Button = styled.button`
  padding: 14px;
  background-color: ${props => props.isPremium ? '#ffd700' : '#007bff'};
  color: ${props => props.isPremium ? '#000' : '#fff'};
  border: none;
  border-radius: 15%; // Round button
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.3s ease;
  width: 250px;
  height: 50px; // Fixed size for round button

  &:hover {
    background-color: ${props => props.isPremium ? '#ffcc00' : '#0056b3'};
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
    width: 200px;
    height: 50px;
  }
`;

export const Loading = styled.div`
  text-align: center;
  color: #fff;
`;