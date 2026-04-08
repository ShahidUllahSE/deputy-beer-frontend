import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

/* Banner deep purple: #0b1a69 + #000034 only, deep purple dominates like banner */
export const FooterContainer = styled.footer`
  background: linear-gradient(
    180deg,
    #0b1a69 0%,
    #0b1a69 22%,
    #000034 100%
  );
  padding: 0.55rem 0 1.35rem 0;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.65rem 0 0.65rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0 0.5rem 0;
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

/* Spacing: moderate between logo and section; larger gap before links (section break); moderate between links/contact/copyright */
export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  padding: 0;

  @media (max-width: 768px) {
    gap: 0.65rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const FooterLogo = styled.div`
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 -2.25rem 0;

  img {
    height: 10rem;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    display: block;
  }

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    img {
      height: 8rem;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 6.5rem;
    }
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

/* Section break: notably larger margin above Terms & Conditions */
export const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  margin-top: 0.65rem;

  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 0.25rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
    flex-direction: column;
    margin-top: 0.2rem;
  }

  @media (max-width: 360px) {
    gap: 1rem;
  }
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: 0.04em;
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
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const FooterContact = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.04em;
  font-family: ${FONTS.PRIMARY};
  margin-top: 0.15rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.95rem;
    margin-top: 0.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    gap: 0.5rem;
    margin-top: 0.1rem;
  }
`;

export const FooterEmail = styled.span`
  color: white;
  font-size: 0.915rem;
  letter-spacing: 0.04em;
  text-align: center;
  word-break: break-word;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.4;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
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
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0.15rem 0 0 0;
  padding: 0 1rem;
  font-family: ${FONTS.PRIMARY};
  letter-spacing: 0.03em;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 0 0.5rem;
    margin-top: 0.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.4;
    padding: 0 0.5rem;
    margin-top: 0.1rem;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
    margin-top: 0.1rem;
  }
`;
