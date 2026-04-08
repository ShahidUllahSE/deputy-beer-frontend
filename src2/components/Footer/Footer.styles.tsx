import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0b3c6e 0%, #2d6ba3 100%);
  padding: 3rem 0 2rem 0;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 150px;
    background: linear-gradient(
      to right,
      rgba(169, 217, 224, 0.3) 0%,
      transparent 100%
    );
    z-index: 0;
  }

  &::before {
    left: 0;
    transform: skewX(-15deg);
  }

  &::after {
    right: 0;
    transform: skewX(15deg);
  }

  @media (max-width: 768px) {
    padding: 2.5rem 0 1.75rem 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 0 1.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const FooterLogo = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  cursor: pointer;
  font-family: ${FONTS.PRIMARY};
  text-shadow: 
    -2px -2px 0 #0b3c6e,
    2px -2px 0 #0b3c6e,
    -2px 2px 0 #0b3c6e,
    2px 2px 0 #0b3c6e,
    0 0 8px rgba(11, 60, 110, 0.5);
  transition: all 0.3s ease;
  text-align: center;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
    text-shadow: 
      -2px -2px 0 #0b3c6e,
      2px -2px 0 #0b3c6e,
      -2px 2px 0 #0b3c6e,
      2px 2px 0 #0b3c6e,
      0 0 12px rgba(169, 217, 224, 0.7);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const FooterTagline = styled.p`
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: -0.5rem 0 0 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    letter-spacing: 1.5px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    flex-direction: column;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: ${FONTS.PRIMARY};
  padding: 0;
  margin: 0;
  font-weight: 500;

  &:hover {
    color: #ffeb3b;
    text-decoration: underline;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const FooterContact = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: white;
  font-size: 0.9rem;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 0.5rem;
  }
`;

export const FooterEmail = styled.span`
  color: white;
  font-size: 0.9rem;
  text-align: center;
  word-break: break-word;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const FooterHashtags = styled.div`
  color: white;
  font-size: 0.85rem;
  font-family: ${FONTS.PRIMARY};
  text-align: center;
  word-break: break-word;
  max-width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }

  @media (max-width: 360px) {
    font-size: 0.65rem;
  }
`;

export const FooterNote = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  padding: 0 1rem;
  font-family: ${FONTS.PRIMARY};
  text-align: center;
  word-break: break-word;
  max-width: 100%;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }

  @media (max-width: 360px) {
    font-size: 0.6rem;
  }
`;
