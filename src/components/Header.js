import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UnsplashLogo from "../imgs/logo.png";

export default function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo src={UnsplashLogo} alt="Unsplash Logo" />
      </Link>
      <StyledLink href="https://unsplash.com/documentation#getting-started" target="_blank" rel="noopener noreferrer">Unsplash Document</StyledLink>
      <StyledLink href="https://github.com/nqq203/unsplash" target="_blank" rel="noopener noreferrer">My Github Repo</StyledLink>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #ffff;
  color: #000;
  padding: 10px 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2em;

  @media (max-width: 768px) {
    justify-content: space-around;  // Better space distribution on smaller screens
    font-size: 1em;  // Smaller font size for mobile
    padding: 10px;  // Less padding to save space
  }
`;


const Logo = styled.img`
  height: 50px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 40px;  // Slightly smaller logo for mobile
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #000;
  transition: color 0.3s ease;

  &:hover {
    color: #555;  // Lighten the color on hover for visual feedback
  }

  @media (max-width: 768px) {
    font-size: 0.9em;  // Slightly smaller text on mobile devices
  }
`;