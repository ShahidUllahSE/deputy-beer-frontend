import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #5a8bb8 30%, #7fb8c4 60%, #a9d9e0 100%);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  font-family: ${FONTS.PRIMARY};
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;

  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    color: #333;
    line-height: 1.8;
  }

  li {
    margin-bottom: 0.75rem;
    color: #555;
  }

  strong {
    color: #0b3c6e;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    ul {
      padding-left: 1.5rem;
    }
  }
`;

export const BackButton = styled.button`
  background: #0b3c6e;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: ${FONTS.PRIMARY};
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 60, 110, 0.3);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 13px;
  }
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #0b3c6e;
  margin-bottom: 2.5rem;
  font-family: ${FONTS.PRIMARY};
  text-align: center;
  position: relative;
  padding-bottom: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, transparent, #0b3c6e, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    padding-bottom: 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #0b3c6e;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f4f8;
    box-shadow: 0 4px 12px rgba(11, 60, 110, 0.1);
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0b3c6e;
  margin-bottom: 1rem;
  font-family: ${FONTS.PRIMARY};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #a9d9e0;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 1rem;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

export default Container;
