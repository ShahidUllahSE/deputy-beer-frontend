import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd 0%, #5a8bb8 30%, #7fb8c4 60%, #a9d9e0 100%);
  padding: 2rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 520px;
  text-align: center;
  font-family: ${FONTS.PRIMARY};
`;

export const Title = styled.h1`
  color: #0b3c6e;
  font-size: 2rem;
  margin: 0 0 0.75rem 0;
  font-weight: 900;
`;

export const Subtitle = styled.p`
  color: #333;
  font-size: 1rem;
  margin: 0 0 1.25rem 0;
`;

export const PrimaryButton = styled.button`
  background: #0b3c6e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.875rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  &:hover {
    background: #0a2d55;
    transform: translateY(-1px);
  }
`;

