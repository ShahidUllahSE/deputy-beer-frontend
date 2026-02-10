import styled from "styled-components";

export const HistoryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

export const HistoryHeader = styled.div`
  max-width: 900px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #0b3c6e;
  border-radius: 8px;
  color: #0b3c6e;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;

  &:hover {
    background: #0b3c6e;
    color: white;
    transform: translateX(-4px);
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const HistoryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0b3c6e;
  margin: 0;
  font-family: "Manrope", sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const HistoryContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const HistoryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const HistoryCardHeader = styled.div`
  background: linear-gradient(135deg, #0b3c6e 0%, #1a5a8a 100%);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const HistoryType = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: "Manrope", sans-serif;

  svg {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const HistoryDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  font-family: "Manrope", sans-serif;

  svg {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const HistoryCardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${props => props.style?.alignItems || 'center'};
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryLabel = styled.span`
  font-weight: 600;
  color: #666;
  font-size: 0.95rem;
  font-family: "Manrope", sans-serif;
`;

export const HistoryValue = styled.span`
  font-weight: 700;
  color: #0b3c6e;
  font-size: 1.1rem;
  font-family: "Manrope", sans-serif;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  svg {
    color: #ccc;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin: 0.5rem 0;
    font-family: "Manrope", sans-serif;
  }

  p {
    color: #666;
    font-size: 1rem;
    font-family: "Manrope", sans-serif;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  color: #666;
  font-family: "Manrope", sans-serif;
`;
