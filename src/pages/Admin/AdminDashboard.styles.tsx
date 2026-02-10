import styled from "styled-components";

export const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  width: 100%;
  overflow-x: hidden;
`;

export const AdminSidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #0b3c6e 0%, #1a5a8a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 240px;
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Manrope", sans-serif;

  svg {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

export const SidebarMenu = styled.div`
  padding: 1rem 0;
  flex: 1;
`;

export const MenuItem = styled.div<{ $active?: boolean }>`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.1)" : "transparent")};
  border-left: ${({ $active }) => ($active ? "4px solid white" : "4px solid transparent")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  font-family: "Manrope", sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const LogoutButton = styled.button`
  margin: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Manrope", sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const AdminContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  min-height: 100vh;
  background: #f5f7fa;
  transition: margin-left 0.3s ease;
  width: calc(100% - 280px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const UserCard = styled.div<{ $active?: boolean; $blocked?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 2px solid ${({ $active }) => ($active ? "#0b3c6e" : "transparent")};
  box-shadow: ${({ $active }) => ($active ? "0 4px 12px rgba(11, 60, 110, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.1)")};
  opacity: ${({ $blocked }) => ($blocked ? 0.7 : 1)};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

export const UserName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0b3c6e;
  margin: 0 0 0.5rem 0;
  font-family: "Manrope", sans-serif;
`;

export const UserEmail = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-family: "Manrope", sans-serif;
`;

export const UserStats = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  font-family: "Manrope", sans-serif;
`;

export const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0b3c6e;
  font-family: "Manrope", sans-serif;
`;

export const UserActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
`;

export const ActionButton = styled.button<{ $variant?: "view" | "block" | "unblock" | "delete" }>`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-family: "Manrope", sans-serif;
  
  ${({ $variant }) => {
    switch ($variant) {
      case "view":
        return `
          background: #0b3c6e;
          color: white;
          &:hover {
            background: #1a5a8a;
            transform: scale(1.05);
          }
        `;
      case "block":
        return `
          background: #ffaa00;
          color: white;
          &:hover {
            background: #ff8800;
            transform: scale(1.05);
          }
        `;
      case "unblock":
        return `
          background: #00aa44;
          color: white;
          &:hover {
            background: #008833;
            transform: scale(1.05);
          }
        `;
      case "delete":
        return `
          background: #ff4444;
          color: white;
          &:hover {
            background: #cc0000;
            transform: scale(1.05);
          }
        `;
      default:
        return `
          background: #f0f0f0;
          color: #333;
          &:hover {
            background: #e0e0e0;
          }
        `;
    }
  }}
`;

export const HistoryPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HistoryHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const HistoryTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0b3c6e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Manrope", sans-serif;

  svg {
    font-size: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
`;

export const HistoryCardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const ContentContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }
`;

export const ContentTitle = styled.h2`
  margin: 0;
  color: #0b3c6e;
  font-family: "Manrope", sans-serif;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: "Manrope", sans-serif;
  background: white;

  &:focus {
    outline: none;
    border-color: #0b3c6e;
    box-shadow: 0 0 0 2px rgba(11, 60, 110, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;

export const SummaryStats = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const SummaryText = styled.span`
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
  font-family: "Manrope", sans-serif;
`;

export const SummaryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.3em 0.7em;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #ffc107;
  color: #1a1a1a;
  font-family: "Manrope", sans-serif;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    margin: 0;
    padding: 0;
  }
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Manrope", sans-serif;
  min-width: 800px;
  margin: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 600px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    min-width: 500px;
    font-size: 0.75rem;
  }
`;

export const UsersTableOld = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Manrope", sans-serif;
  display: table;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
`;

export const TableHeader = styled.thead`
  background: linear-gradient(135deg, #0b3c6e 0%, #1a5a8a 100%);
  color: white;
  display: table-header-group;

  @media (max-width: 768px) {
    display: table-header-group;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 0.6rem 0.8rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  color: white;

  @media (max-width: 768px) {
    padding: 0.5rem 0.6rem;
    font-size: 0.7rem;
    letter-spacing: 0.2px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.5rem;
    font-size: 0.65rem;
    letter-spacing: 0;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
  background: white;

  &:hover {
    background-color: #f5f7fa;
  }

  &:nth-child(even) {
    background-color: #fafafa;
    
    &:hover {
      background-color: #f0f2f5;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 0.5rem 0.8rem;
  color: #333;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;

  @media (max-width: 768px) {
    padding: 0.45rem 0.6rem;
    font-size: 0.75rem;
    max-width: 120px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.5rem;
    font-size: 0.7rem;
    max-width: 100px;
  }
`;

export const StatBadge = styled.span<{ $variant?: "primary" | "success" | "warning" | "info" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em 0.5em;
  border-radius: 12px;
  font-size: 0.7em;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  background-color: #ffc107;
  font-family: "Manrope", sans-serif;
`;

export const StatusBadge = styled.span<{ $variant?: "active" | "blocked" | "unverified" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em 0.5em;
  border-radius: 12px;
  font-size: 0.7em;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  background-color: #ffc107;
  font-family: "Manrope", sans-serif;
  text-transform: uppercase;
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const PaginationInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-family: "Manrope", sans-serif;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const PaginationNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "#0b3c6e" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#1a5a8a" : "#f5f5f5")};
    border-color: ${({ $active }) => ($active ? "#1a5a8a" : "#0b3c6e")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #0b3c6e 0%, #1a5a8a 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Manrope", sans-serif;
  box-shadow: 0 2px 8px rgba(11, 60, 110, 0.2);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 60, 110, 0.3);
  }

  svg {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    gap: 0.25rem;
    
    span {
      display: none;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #0b3c6e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: #1a5a8a;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileCloseButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
