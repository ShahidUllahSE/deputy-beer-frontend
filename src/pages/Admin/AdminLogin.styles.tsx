import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0b3c6e 0%, #2d6ba3 40%, #7fb8c4 75%, #a9d9e0 100%);
  padding: 2rem;
`;

export const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  position: relative;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

export const BackLink = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #0b3c6e;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: ${FONTS.PRIMARY};
  transition: color 0.3s ease;

  &:hover {
    color: #1a5a8a;
  }
`;

export const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #0b3c6e;
  margin: 0 0 2rem 0;
  text-align: center;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${FONTS.PRIMARY};

  svg {
    color: #0b3c6e;
  }
`;

export const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};

  &:focus {
    outline: none;
    border-color: #0b3c6e;
    box-shadow: 0 0 0 3px rgba(11, 60, 110, 0.1);
  }
`;

export const LoginButton = styled.button`
  padding: 1rem;
  background: linear-gradient(135deg, #0b3c6e 0%, #1a5a8a 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 60, 110, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem 1rem;
  background: #fee;
  color: #c33;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: ${FONTS.PRIMARY};
`;
