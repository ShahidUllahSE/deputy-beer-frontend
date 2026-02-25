import styled from "styled-components";
import { FONTS } from "../../constants/fonts";
import { COLORS } from "../../constants/colors";

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${COLORS.white};
`;

export const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${COLORS.navy};
  font-family: ${FONTS.PRIMARY};
  white-space: nowrap;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 18px;
    letter-spacing: -0.3px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    letter-spacing: -0.2px;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const AuthButton = styled.button.attrs<{ $primary?: boolean }>((props) => ({
  as: props.as || 'button',
}))<{ $primary?: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
  border: ${({ $primary }) => ($primary ? "none" : `2px solid ${COLORS.navy}`)};
  background-color: ${({ $primary }) => ($primary ? COLORS.navy : "transparent")};
  color: ${({ $primary }) => ($primary ? COLORS.white : COLORS.navy)};
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? COLORS.primaryBlue : COLORS.lightBlue)};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.45rem 1rem;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.75rem;
    font-size: 11px;
  }
`;

export const HeroSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 2rem 5%;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 2rem 4%;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.25rem;
  }
`;

export const HeroImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 2rem 5%;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    padding: 2rem 4%;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const HeroHeadline = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  padding: 0;
  line-height: 1.2;
  color: white;
  font-family: ${FONTS.PRIMARY};
  letter-spacing: -0.3px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-line;
  text-align: left;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 1200px) {
    font-size: 2.25rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 968px) {
    font-size: 2rem;
    line-height: 1.25;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    line-height: 1.3;
    letter-spacing: -0.2px;
    text-align: center;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    line-height: 1.35;
    letter-spacing: -0.1px;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 360px) {
    font-size: 1.25rem;
    line-height: 1.35;
    letter-spacing: 0px;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 300px) {
    font-size: 1.1rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }
`;

export const HeroSubheadline = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  line-height: 1.4;
  color: ${COLORS.white};
  font-family: ${FONTS.PRIMARY};
  letter-spacing: 0.3px;
  text-align: left;
  position: relative;
  padding-left: 1.5rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, ${COLORS.white}, rgba(255, 255, 255, 0.7));
    border-radius: 2px;
  }

  @media (max-width: 1200px) {
    font-size: 1.4rem;
    padding-left: 1.25rem;
  }

  @media (max-width: 968px) {
    font-size: 1.3rem;
    padding-left: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    text-align: center;
    padding-left: 0;
    padding-top: 1rem;
    
    &::before {
      display: none;
    }
    
    &::after {
      content: "";
      display: block;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #0b3c6e, #2d6ba3);
      border-radius: 2px;
      margin: 0.75rem auto 0;
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding-top: 0.75rem;
    line-height: 1.5;
    word-break: break-word;
  }

  @media (max-width: 360px) {
    font-size: 0.9rem;
    padding-top: 0.5rem;
    line-height: 1.4;
  }

  @media (max-width: 300px) {
    font-size: 0.85rem;
  }
`;

export const HeroSubtext = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  font-family: ${FONTS.PRIMARY};
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 2;
  max-width: 50%;
  margin: 0;
  padding: 0;
  letter-spacing: 0.3px;

  @media (max-width: 1200px) {
    max-width: 55%;
    font-size: 1.3rem;
  }

  @media (max-width: 968px) {
    max-width: 60%;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    max-width: 65%;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    max-width: 80%;
    font-size: 0.95rem;
  }
`;

export const InfoStepsSection = styled.section`
  width: 100%;
  padding: 3rem 5% 2.5rem 5%;
  background: white;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    padding: 2.5rem 4% 2rem 4%;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem 1.75rem 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem 1.5rem 1.25rem;
  }
`;

export const StepsImageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    
    img {
      border-radius: 10px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    
    img {
      border-radius: 8px;
    }
  }
`;

export const StepsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: #0b3c6e;
  text-align: center;
  margin: 0 0 3rem 0;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  position: relative;
  display: block;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
    letter-spacing: 0.2px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    letter-spacing: 0.1px;
    word-break: break-word;
  }

  @media (max-width: 360px) {
    font-size: 1.3rem;
    letter-spacing: 0px;
  }
`;

export const InfoStepsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  position: relative;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 0;
    align-items: stretch;
  }
`;

export const InfoStepItem = styled.div<{ $isOrange?: boolean; $hasChevron?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  position: relative;
  background: ${({ $isOrange }) => ($isOrange ? COLORS.orange : COLORS.white)};
  padding: 2rem 1.5rem 2rem 1.5rem;
  padding-right: ${({ $hasChevron }) => ($hasChevron ? "3rem" : "1.5rem")};
  border-radius: ${({ $hasChevron }) => ($hasChevron ? "12px 0 0 12px" : "0 12px 12px 0")};
  min-height: 200px;
  justify-content: flex-start;
  clip-path: ${({ $hasChevron }) =>
    $hasChevron
      ? "polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)"
      : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"};

  @media (max-width: 968px) {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 1rem;
    min-height: 180px;
    padding: 1.75rem 1.5rem;
    padding-right: 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
    min-height: 160px;
    border-radius: 10px;
  }
`;

export const StepNumberSquare = styled.div`
  width: 50px;
  height: 50px;
  background-color: #0b3c6e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  font-family: ${FONTS.PRIMARY};
  flex-shrink: 0;
  margin-bottom: 1.5rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const StepMainText = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #000;
  margin: 0 0 0.75rem 0;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
  }
`;

export const StepSubText = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  margin: 0;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`;

export const StepsSubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e8e8e8;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, transparent, #0b3c6e, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.75rem;
  }

  @media (max-width: 480px) {
    margin-top: 1.75rem;
    padding-top: 1.5rem;
  }
`;

export const StepsSubmitButton = styled.button`
  padding: 1rem 2.5rem;
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
  box-shadow: 0 4px 15px rgba(11, 60, 110, 0.3);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    background-color: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 60, 110, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.85rem 1.75rem;
    font-size: 0.9rem;
    letter-spacing: 0.3px;
  }
`;

export const QRFormSection = styled.section`
  width: 100%;
  background-color: #e3f2fd;
  padding: 3rem 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin-top: 1.5rem;
  }
`;

export const QRFormContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

export const QRFormTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 900;
  color: #0b3c6e;
  margin: 0 0 0.5rem 0;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1.25;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const QRFormSubtitle = styled.p`
  font-size: 0.9rem;
  color: #0b3c6e;
  margin: 0 0 1.5rem 0;
  font-family: ${FONTS.PRIMARY};
  line-height: 1.4;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 1.25rem;
  }
`;

export const ModalQRCodeSection = styled.div`
  background-color: transparent;
  border-radius: 12px;
  padding: 0;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

export const ModalQRCodeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const ModalQRFieldRow = styled.div<{ $hasValue: boolean }>`
  display: flex;
  align-items: ${({ $hasValue }) => ($hasValue ? "flex-start" : "center")};
  justify-content: space-between;
  background-color: #e3f2fd;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-height: ${({ $hasValue }) => ($hasValue ? "60px" : "50px")};
  transition: all 0.3s ease;
  gap: 0.75rem;

  &:hover {
    background-color: #bbdefb;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 0.85rem;
    min-height: ${({ $hasValue }) => ($hasValue ? "55px" : "45px")};
    gap: 0.5rem;
  }
`;

export const ModalQRFieldLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #0b3c6e;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ModalQRFieldActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ModalQRFieldIcon = styled.button<{ $uploaded?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $uploaded }) => ($uploaded ? "#0b3c6e" : "transparent")};
  border: ${({ $uploaded }) => ($uploaded ? "none" : "2px solid #0b3c6e")};
  color: ${({ $uploaded }) => ($uploaded ? "white" : "#0b3c6e")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  padding: 0;

  &:hover:not(:disabled) {
    background-color: #0b3c6e;
    color: white;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 14px;

    svg {
      font-size: 14px;
    }
  }
`;

export const ModalQRFieldStatus = styled.span`
  font-size: 0.85rem;
  color: #0b3c6e;
  font-weight: 500;
  font-family: ${FONTS.PRIMARY};
  margin-left: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ModalSubmitText = styled.p`
  font-size: 0.85rem;
  color: #0b3c6e;
  text-align: center;
  margin: 1rem 0 0.75rem 0;
  font-family: ${FONTS.PRIMARY};

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0.75rem 0 0.5rem 0;
  }
`;

export const ModalSubmitButton = styled.button`
  padding: 1rem 3rem;
  background-color: #0b3c6e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(11, 60, 110, 0.3);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;

  &:hover:not(:disabled) {
    background-color: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 60, 110, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.95rem 2.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 2rem;
    font-size: 0.95rem;
  }
`;

export const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.25rem;
  }

  @media (max-width: 360px) {
    padding: 0 1rem;
  }
`;

export const QRCodeSection = styled.div`
  background-color: #fafafa;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-bottom: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 360px) {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border-radius: 10px;
  }
`;

export const QRCodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 360px) {
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

export const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem 3rem;
  background-color: #0b3c6e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${FONTS.PRIMARY};
  box-shadow: 0 4px 15px rgba(11, 60, 110, 0.4);

  &:hover:not(:disabled) {
    background-color: #0a2d55;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 60, 110, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 17px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(169, 217, 224, 0.35);
  }

  @media (max-width: 480px) {
    padding: 0.95rem 2rem;
    font-size: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(169, 217, 224, 0.3);
  }
`;

export const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid #fcc;
  font-family: ${FONTS.PRIMARY};
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.8rem;
    border-radius: 6px;
  }
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

export const InfoCard = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    border-color: #0b3c6e;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0b3c6e;
    margin-bottom: 1rem;
    font-family: ${FONTS.PRIMARY};

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    color: #666;
    line-height: 1.6;
    font-family: ${FONTS.PRIMARY};
    font-size: 0.95rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 360px) {
    padding: 1.25rem;
    border-radius: 10px;
  }
`;

