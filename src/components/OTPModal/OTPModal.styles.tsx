import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
    padding-top: 1rem;
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  margin: auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    max-height: 95vh;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 12px;
    max-height: 98vh;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  line-height: 1;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
    transform: rotate(90deg);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.25rem;
    width: 28px;
    height: 28px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: #0b3c6e;
  text-align: center;
  margin: 0 0 0.75rem 0;
  font-family: "Manrope", sans-serif;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, transparent, #0b3c6e, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.4rem;
    &::after {
      width: 40px;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-family: "Manrope", sans-serif;

  strong {
    color: #0b3c6e;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1.25rem;
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
  width: 55px;
  height: 55px;
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
    border-color: #0b3c6e;
    box-shadow: 0 0 0 3px rgba(11, 60, 110, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 1.25rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  font-family: "Manrope", sans-serif;
  min-height: 1.2rem;
`;

export const TimerText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-family: "Manrope", sans-serif;

  strong {
    color: #0b3c6e;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1.25rem;
  }
`;

export const ButtonDiv = styled.div`
  margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #0b3c6e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    background-color: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 60, 110, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.9rem;
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
  color: #0b3c6e;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  font-family: "Manrope", sans-serif;
  padding: 0;
  margin-left: 4px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    color: #0a2d55;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
