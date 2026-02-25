import styled from "styled-components";
import { FONTS } from "../../constants/fonts";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.25rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
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
  font-family: ${FONTS.PRIMARY};
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
  margin: 0 0 1rem 0;
  font-family: ${FONTS.PRIMARY};
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, transparent, #0b3c6e, transparent);
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
`;

export const CropContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  max-height: 500px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: auto;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  @media (max-width: 768px) {
    min-height: 350px;
    max-height: 400px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
    max-height: 350px;
  }
`;

export const CropImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;

  @media (max-width: 768px) {
    max-height: 350px;
  }

  @media (max-width: 480px) {
    max-height: 300px;
  }
`;

export const CropArea = styled.div`
  position: absolute;
  border: 3px solid #0b3c6e;
  background: rgba(11, 60, 110, 0.15);
  cursor: move;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
  user-select: none;
  touch-action: none;
  
  &:active {
    cursor: grabbing;
  }
`;

export const CropHandle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: #0b3c6e;
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: scale(1.3);
    background: #0a2d55;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: scale(1.15);
    background: #082040;
  }
`;

export const CropControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const CropButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0b3c6e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
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
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
    width: 100%;
  }
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
    width: 100%;
  }
`;

export const ProcessingText = styled.p`
  text-align: center;
  color: #0b3c6e;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
  font-family: ${FONTS.PRIMARY};
`;
