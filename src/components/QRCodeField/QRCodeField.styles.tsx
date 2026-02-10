import styled from "styled-components";

export const QRFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const QRFieldLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const QRFieldBox = styled.div<{ $hasValue: boolean; $disabled?: boolean }>`
  width: 100%;
  min-height: 120px;
  border: 2px dashed ${({ $hasValue }) => ($hasValue ? "#0b3c6e" : "#ddd")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $hasValue }) => ($hasValue ? "#e3f2fd" : "#fafafa")};
  transition: all 0.3s ease;
  padding: 1rem;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};

  &:hover {
    border-color: ${({ $hasValue, $disabled }) =>
      $disabled ? "#ddd" : $hasValue ? "#0b3c6e" : "#a9d9e0"};
    background-color: ${({ $hasValue }) =>
      $hasValue ? "#e3f2fd" : "#e3f2fd"};
  }

  @media (max-width: 768px) {
    min-height: 140px;
    padding: 1.25rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-height: 130px;
    padding: 1rem;
    border-radius: 8px;
    border-width: 2px;
  }
`;

export const QRFieldActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
  }
`;

export const QRButton = styled.button<{ $variant?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ $variant }) =>
    $variant === "upload" ? "#7fb8c4" : "#a9d9e0"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === "upload" ? "#6ba8b8" : "#7fb8c4"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 13px;
    gap: 0.4rem;

    svg {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 12px;
    gap: 0.3rem;
    flex: 1;
    justify-content: center;

    svg {
      font-size: 13px;
    }
  }
`;

export const QRImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QRImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 6px;
  object-fit: contain;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dc3545;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background-color: #c82333;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 14px;
  }
`;
