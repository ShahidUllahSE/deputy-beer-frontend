import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiService } from "../../services/api";
import { RootState } from "../../redux/store";
import {
  HistoryContainer,
  HistoryHeader,
  HistoryTitle,
  HistoryContent,
  HistoryCard,
  HistoryCardHeader,
  HistoryCardBody,
  HistoryItem,
  HistoryLabel,
  HistoryValue,
  HistoryDate,
  HistoryType,
  EmptyState,
  LoadingState,
  BackButton,
} from "./History.styles";
import { FaArrowLeft, FaHistory, FaQrcode, FaTrophy, FaCalendar } from "react-icons/fa";

// Mask QR code - show only first 2 and last 2 characters
const maskQRCode = (code: string): string => {
  if (!code || code.length <= 4) {
    return "****";
  }
  if (code.length <= 6) {
    return `${code.substring(0, 2)}***${code.substring(code.length - 1)}`;
  }
  return `${code.substring(0, 2)}${"*".repeat(Math.min(code.length - 4, 6))}${code.substring(code.length - 2)}`;
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const History: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please sign in to view your history");
      navigate("/");
      return;
    }

    fetchHistory();
  }, [isLoggedIn, navigate]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUserScanHistory();
      const rawHistory = response.history || [];
      
      // Group entries by entryId
      const groupedHistory: any[] = [];
      const entryGroups = new Map<string, any[]>();
      const processedEntryIds = new Set<string>();
      
      // First pass: group entries with entryId
      rawHistory.forEach((item: any) => {
        if (item.type === "Entry" && item.entryId) {
          const entryId = item.entryId.toString();
          if (!entryGroups.has(entryId)) {
            entryGroups.set(entryId, []);
          }
          entryGroups.get(entryId)!.push(item);
        }
      });
      
      // Second pass: add grouped entries and individual scans
      rawHistory.forEach((item: any) => {
        if (item.type === "Entry" && item.entryId) {
          const entryId = item.entryId.toString();
          if (!processedEntryIds.has(entryId)) {
            // Add grouped entry as single item
            const groupedItems = entryGroups.get(entryId)!;
            groupedHistory.push({
              ...groupedItems[0], // Use first item's metadata
              qrCodes: groupedItems.map((i: any) => i.qrCode), // All QR codes
              isGrouped: true,
            });
            processedEntryIds.add(entryId);
          }
        } else {
          // Individual QR code scans (not part of entry)
          groupedHistory.push(item);
        }
      });
      
      setHistory(groupedHistory);
    } catch (error: any) {
      console.error("Error fetching history:", error);
      toast.error(error.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case "Entry":
        return "Entry Submission";
      case "QRCodeScan":
        return "QR Code Scan";
      default:
        return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Entry":
        return <FaTrophy />;
      case "QRCodeScan":
        return <FaQrcode />;
      default:
        return <FaHistory />;
    }
  };

  if (loading) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <BackButton onClick={() => navigate("/")}>
            <FaArrowLeft /> Back
          </BackButton>
          <HistoryTitle>My History</HistoryTitle>
        </HistoryHeader>
        <HistoryContent>
          <LoadingState>Loading your history...</LoadingState>
        </HistoryContent>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <BackButton onClick={() => navigate("/")}>
          <FaArrowLeft /> Back
        </BackButton>
        <HistoryTitle>My History</HistoryTitle>
      </HistoryHeader>
      <HistoryContent>
        {history.length === 0 ? (
          <EmptyState>
            <FaHistory size={48} />
            <h3>No History Yet</h3>
            <p>Your scan and entry history will appear here</p>
          </EmptyState>
        ) : (
          history.map((item, index) => (
            <HistoryCard key={item._id || item.entryId || index}>
              <HistoryCardHeader>
                <HistoryType>
                  {getTypeIcon(item.type)}
                  {getTypeLabel(item.type)}
                </HistoryType>
                <HistoryDate>
                  <FaCalendar /> {formatDate(item.scannedAt || item.createdAt)}
                </HistoryDate>
              </HistoryCardHeader>
              <HistoryCardBody>
                {item.isGrouped && item.qrCodes ? (
                  // Grouped entry - show all 4 QR codes
                  <HistoryItem style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.75rem" }}>
                    <HistoryLabel>QR Codes (4):</HistoryLabel>
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "0.5rem", 
                      width: "100%",
                      paddingLeft: "0.5rem"
                    }}>
                      {item.qrCodes.map((code: string, idx: number) => (
                        <div key={idx} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem",
                          background: "#f8f9fa",
                          borderRadius: "6px"
                        }}>
                          <span style={{ 
                            color: "#666", 
                            fontSize: "0.85rem", 
                            fontWeight: 600,
                            minWidth: "60px"
                          }}>
                            Crown {idx + 1}:
                          </span>
                          <HistoryValue style={{ fontSize: "0.95rem", margin: 0 }}>
                            {maskQRCode(code)}
                          </HistoryValue>
                        </div>
                      ))}
                    </div>
                  </HistoryItem>
                ) : (
                  // Individual QR code scan
                  <>
                    <HistoryItem>
                      <HistoryLabel>QR Code:</HistoryLabel>
                      <HistoryValue>{maskQRCode(item.qrCode)}</HistoryValue>
                    </HistoryItem>
                    {item.points_earned > 0 && (
                      <HistoryItem>
                        <HistoryLabel>Points Earned:</HistoryLabel>
                        <HistoryValue>+{item.points_earned}</HistoryValue>
                      </HistoryItem>
                    )}
                  </>
                )}
              </HistoryCardBody>
            </HistoryCard>
          ))
        )}
      </HistoryContent>
    </HistoryContainer>
  );
};

export default History;
