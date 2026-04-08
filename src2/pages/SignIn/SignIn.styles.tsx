import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd 0%, #5a8bb8 30%, #7fb8c4 60%, #a9d9e0 100%);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  color: #0b3c6e;
  text-align: center;
  margin-bottom: 0.8rem;
  font-size: 2rem;
  font-weight: 900;
  font-family: ${FONTS.PRIMARY};
  position: relative;
  padding-bottom: 1rem;

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
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const Underline = styled.hr`
  display: none;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: ${FONTS.PRIMARY};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: ${FONTS.PRIMARY};
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0b3c6e;
    box-shadow: 0 0 0 3px rgba(11, 60, 110, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.65rem;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-family: ${FONTS.PRIMARY};
`;

export const ButtonDiv = styled.div`
  margin-top: 1.5rem;
`;

export const SubmitButton = styled.button`
  background: #0b3c6e;
  color: white;
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(11, 60, 110, 0.3);

  &:hover:not(:disabled) {
    background: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 60, 110, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
  font-family: ${FONTS.PRIMARY};
`;

export const SwitchText = styled.span`
  color: #0b3c6e;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  &:hover {
    color: #0a2d55;
    text-decoration: underline;
  }
`;
