import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiService } from "../../services/api";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import {
  AdminContainer,
  AdminSidebar,
  AdminContent,
  SidebarHeader,
  SidebarTitle,
  SidebarMenu,
  MenuItem,
  HistoryHeader,
  HistoryTitle,
  HistoryList,
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
  LogoutButton,
  BackButton,
} from "./AdminDashboard.styles";
import {
  FaUsers,
  FaHistory,
  FaSignOutAlt,
  FaTrophy,
  FaQrcode,
  FaCalendar,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";

// Mask QR code
const maskQRCode = (code: string): string => {
  if (!code || code.length <= 4) return "****";
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

const UserHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || role !== "admin") {
      toast.error("Admin access required");
      navigate("/admin/dashboard");
      return;
    }

    if (userId) {
      fetchUserHistory(userId);
    }
  }, [isLoggedIn, role, navigate, userId]);

  const fetchUserHistory = async (userId: string) => {
    try {
      setLoading(true);
      const response = await apiService.getUserHistory(userId);
      setUserHistory(response.history || []);
      
      // Set user info from response
      if (response.user) {
        setUserInfo({
          name: response.user.name || 'Unknown',
          email: response.user.email || 'Unknown',
        });
      }
    } catch (error: any) {
      console.error("Error fetching user history:", error);
      toast.error(error.message || "Failed to load user history");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/");
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
      <AdminContainer>
        <AdminSidebar>
          <SidebarHeader>
            <SidebarTitle>
              <FaUsers /> Admin Panel
            </SidebarTitle>
          </SidebarHeader>
          <SidebarMenu>
            <MenuItem $active onClick={() => navigate("/admin/dashboard")}>
              <FaUsers /> User Management
            </MenuItem>
          </SidebarMenu>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </LogoutButton>
        </AdminSidebar>
        <AdminContent>
          <LoadingState>Loading history...</LoadingState>
        </AdminContent>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminSidebar>
        <SidebarHeader>
          <SidebarTitle>
            <FaUsers /> Admin Panel
          </SidebarTitle>
        </SidebarHeader>
        <SidebarMenu>
          <MenuItem $active onClick={() => navigate("/admin/dashboard")}>
            <FaUsers /> User Management
          </MenuItem>
        </SidebarMenu>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </AdminSidebar>

      <AdminContent>
        <BackButton onClick={() => navigate("/admin/dashboard")} style={{ marginBottom: "2rem" }}>
          <FaArrowLeft /> Back to Users
        </BackButton>
        
        <HistoryHeader>
          <HistoryTitle>
            <FaUser /> {userInfo?.name || "User"}'s History
          </HistoryTitle>
        </HistoryHeader>

        {userHistory.length === 0 ? (
          <EmptyState>
            <FaHistory size={48} />
            <h3>No History</h3>
            <p>This user has no scan or entry history yet.</p>
          </EmptyState>
        ) : (
          <HistoryList>
            {userHistory.map((item, index) => (
              <HistoryCard key={item._id || index}>
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
                    <HistoryItem style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.75rem" }}>
                      <HistoryLabel>QR Codes (4):</HistoryLabel>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", paddingLeft: "0.5rem" }}>
                        {item.qrCodes.map((code: string, idx: number) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", background: "#f8f9fa", borderRadius: "6px" }}>
                            <span style={{ color: "#666", fontSize: "0.85rem", fontWeight: 600, minWidth: "60px" }}>
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
            ))}
          </HistoryList>
        )}
      </AdminContent>
    </AdminContainer>
  );
};

export default UserHistory;
