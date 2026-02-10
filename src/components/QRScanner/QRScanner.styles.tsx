import styled from "styled-components";

export const ScannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScannerOverlay = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScannerFrame = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  background-color: #000;

  @media (max-width: 768px) {
    max-width: 90%;
    height: 350px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    height: 300px;
    border-radius: 6px;
    border-width: 2px;
  }
`;

export const ScannerVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background-color: #000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;

    svg {
      font-size: 18px;
    }
  }
`;

export const ScannerInstructions = styled.div`
  position: absolute;
  top: 80px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  font-family: "Manrope", sans-serif;

  @media (max-width: 768px) {
    top: 60px;
    font-size: 16px;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    top: 50px;
    font-size: 14px;
    padding: 0.5rem;
    border-radius: 6px;
  }
`;

export const SwitchCameraButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;

  &:hover {
    background-color: white;
    transform: translateX(-50%) scale(1.1);
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    width: 45px;
    height: 45px;

    svg {
      font-size: 18px;
    }
  }
`;
