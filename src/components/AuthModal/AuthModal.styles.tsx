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
  overflow-y: auto;

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
  padding: 1rem;
  max-width: 500px;
  width: 100%;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.9rem;
    border-radius: 16px;
    max-height: 95vh;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
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
  font-size: 1.3rem;
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
    height: 2px;
    background: linear-gradient(to right, transparent, #0b3c6e, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
    padding-bottom: 0.4rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  font-family: "Manrope", sans-serif;
  overflow-y: auto;
  max-height: calc(95vh - 100px);
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FormGroup = styled.div`
  margin-bottom: 0.4rem;

  @media (max-width: 480px) {
    margin-bottom: 0.35rem;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.2rem;
  font-family: "Manrope", sans-serif;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.15rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.45rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  font-family: "Manrope", sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: #0b3c6e;
    box-shadow: 0 0 0 3px rgba(11, 60, 110, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.65rem;
  margin-top: 0.15rem;
  font-family: "Manrope", sans-serif;
  min-height: 0.85rem;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 0.6rem;
    min-height: 0.8rem;
  }
`;

export const ButtonDiv = styled.div`
  margin-top: 0.4rem;

  @media (max-width: 480px) {
    margin-top: 0.35rem;
  }
`;

export const SubmitButton = styled.button`
  background: #0b3c6e;
  color: white;
  width: 100%;
  padding: 0.65rem;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
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
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 12px;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: #666;
  font-family: "Manrope", sans-serif;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: 0.35rem;
  }
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
