import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  font-family: "Manrope", sans-serif;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-family: "Manrope", sans-serif;

  strong {
    color: #333;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const OTPInput = styled.input`
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  color: #333;

  &:focus {
    border-color: #a9d9e0;
    box-shadow: 0 0 0 3px rgba(169, 217, 224, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #a9d9e0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: "Manrope", sans-serif;
`;

export const TimerText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-family: "Manrope", sans-serif;

  strong {
    color: #a9d9e0;
  }
`;

export const ButtonDiv = styled.div`
  margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #a9d9e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;

  &:hover:not(:disabled) {
    background-color: #7fb8c4;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(169, 217, 224, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
`;

export const ResendText = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-family: "Manrope", sans-serif;
  margin: 0;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: #a9d9e0;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  font-family: "Manrope", sans-serif;
  padding: 0;
  margin-left: 4px;

  &:hover:not(:disabled) {
    color: #7fb8c4;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
