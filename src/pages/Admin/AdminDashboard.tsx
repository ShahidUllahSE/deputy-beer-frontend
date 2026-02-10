import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  EmptyState,
  LoadingState,
  LogoutButton,
  ActionButton,
  TableWrapper,
  UsersTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StatBadge,
  StatusBadge,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationNumbers,
  PaginationButton,
  ExportButton,
  MobileMenuButton,
  MobileOverlay,
  MobileCloseButton,
  ContentContainer,
  ContentHeader,
  ContentTitle,
  SearchContainer,
  SearchInput,
  SummaryStats,
  SummaryText,
} from "./AdminDashboard.styles";
import {
  FaUsers,
  FaSignOutAlt,
  FaQrcode,
  FaBan,
  FaCheckCircle,
  FaTrash,
  FaEye,
  FaTable,
  FaListUl,
  FaFileDownload,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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

interface User {
  _id: string;
  name: string;
  email: string;
  entries_count: number;
  points: number;
  isVerified: boolean;
  isActive: boolean;
  created_at: string;
  stats: {
    totalScans: number;
    totalEntries: number;
    totalPointsEarned: number;
  };
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"users" | "stats" | "qr-stats">("users");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [qrStats, setQrStats] = useState<{ totalQRCodes: number; usedQRCodes: number; unusedQRCodes: number } | null>(null);

  useEffect(() => {
    if (!isLoggedIn || role !== "admin") {
      toast.error("Admin access required");
      navigate("/");
      return;
    }

    fetchUsers();
  }, [isLoggedIn, role, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllUsers();
      console.log("Users response:", response); // Debug log
      // Sort users by total scans (descending - most scans first)
      const sortedUsers = (response.users || []).sort((a, b) => {
        return (b.stats.totalScans || 0) - (a.stats.totalScans || 0);
      });
      setUsers(sortedUsers);
      if (response.users && response.users.length === 0) {
        console.log("No users found in database");
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleExportUsers = () => {
    try {
      // Create CSV content
      const headers = ["Name", "Email", "Status", "Total Scans", "Total Entries", "Points", "Joined Date"];
      const rows = users.map(user => [
        user.name,
        user.email,
        !user.isActive ? "Blocked" : !user.isVerified ? "Unverified" : "Active",
        user.stats.totalScans || 0,
        user.stats.totalEntries || 0,
        user.points || 0,
        formatDate(user.created_at)
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Users exported successfully!");
    } catch (error: any) {
      console.error("Error exporting users:", error);
      toast.error("Failed to export users");
    }
  };

  const fetchQRStats = async () => {
    try {
      const response = await apiService.getQRCodeStats();
      setQrStats(response.stats);
    } catch (error: any) {
      console.error("Error fetching QR code stats:", error);
      toast.error(error.message || "Failed to load QR code statistics");
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

  const handleBlockUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      try {
        await apiService.blockUser(userId);
        toast.success("User blocked successfully!");
        fetchUsers(); // Refresh user list
      } catch (error: any) {
        console.error("Error blocking user:", error);
        toast.error(error.message || "Failed to block user");
      }
    }
  };

  const handleUnblockUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to unblock this user?")) {
      try {
        await apiService.unblockUser(userId);
        toast.success("User unblocked successfully!");
        fetchUsers(); // Refresh user list
      } catch (error: any) {
        console.error("Error unblocking user:", error);
        toast.error(error.message || "Failed to unblock user");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await apiService.deleteUser(userId);
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh user list
      } catch (error: any) {
        console.error("Error deleting user:", error);
        toast.error(error.message || "Failed to delete user");
      }
    }
  };

  // Filter and sort users
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user._id.toLowerCase().includes(query)
    );
  });

  // Sort users by totalScans in descending order
  const sortedUsers = [...filteredUsers].sort((a, b) => b.stats.totalScans - a.stats.totalScans);

  if (loading) {
    return (
      <AdminContainer>
        <LoadingState>Loading admin dashboard...</LoadingState>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      {/* Mobile Menu Toggle */}
      <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      {/* Mobile Overlay */}
      {sidebarOpen && <MobileOverlay onClick={() => setSidebarOpen(false)} />}
      
      <AdminSidebar className={sidebarOpen ? "open" : ""}>
        <SidebarHeader>
          <SidebarTitle>
            <FaUsers /> Admin Panel
          </SidebarTitle>
          <MobileCloseButton onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </MobileCloseButton>
        </SidebarHeader>
        <SidebarMenu>
          <MenuItem 
            $active={activeView === "users"}
            onClick={() => {
              setActiveView("users");
              setSidebarOpen(false);
            }}
          >
            <FaListUl /> User Management ({users.length})
          </MenuItem>
          <MenuItem 
            $active={activeView === "stats"}
            onClick={() => {
              setActiveView("stats");
              setSidebarOpen(false);
            }}
          >
            <FaTable /> All Users Stats
          </MenuItem>
          <MenuItem 
            $active={activeView === "qr-stats"}
            onClick={() => {
              setActiveView("qr-stats");
              setSidebarOpen(false);
              fetchQRStats();
            }}
          >
            <FaQrcode /> QR Code Stats
          </MenuItem>
        </SidebarMenu>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </AdminSidebar>

      <AdminContent>
        {activeView === "qr-stats" ? (
          <QRStatsView stats={qrStats} loading={loading} />
        ) : activeView === "stats" ? (
          <UsersStatsView users={users} />
        ) : (
          <ContentContainer>
            <ContentHeader>
              <ContentTitle>All Users</ContentTitle>
              <ExportButton onClick={handleExportUsers}>
                <FaFileDownload /> <span>Export Users</span>
              </ExportButton>
            </ContentHeader>
            
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search by name, email, or user ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>

            <SummaryStats>
              <SummaryText>Total Records: {sortedUsers.length}</SummaryText>
            </SummaryStats>

            {sortedUsers.length === 0 ? (
              <EmptyState>
                <FaUsers size={48} />
                <h3>No Users Found</h3>
                <p>There are no users in the system yet.</p>
              </EmptyState>
            ) : (
              <>
                <TableWrapper>
                  <UsersTable>
                    <TableHeader>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Entries</TableHeaderCell>
                    <TableHeaderCell>Points</TableHeaderCell>
                    <TableHeaderCell>Total Scans</TableHeaderCell>
                    <TableHeaderCell style={{ textAlign: "center" }}>Actions</TableHeaderCell>
                  </TableHeader>
                  <TableBody>
                    {users
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontWeight: 600, color: "#0b3c6e", cursor: "pointer" }} onClick={() => navigate(`/admin/users/${user._id}/history`)}>
                                {user.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {!user.isActive ? (
                              <StatusBadge $variant="blocked">Blocked</StatusBadge>
                            ) : !user.isVerified ? (
                              <StatusBadge $variant="unverified">Unverified</StatusBadge>
                            ) : (
                              <StatusBadge $variant="active">Active</StatusBadge>
                            )}
                          </TableCell>
                          <TableCell>
                            <StatBadge $variant="success">{user.stats.totalEntries}</StatBadge>
                          </TableCell>
                          <TableCell>
                            <StatBadge $variant="warning">{user.points}</StatBadge>
                          </TableCell>
                          <TableCell>
                            <StatBadge $variant="primary">{user.stats.totalScans}</StatBadge>
                          </TableCell>
                          <TableCell>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                              <ActionButton
                                onClick={() => navigate(`/admin/users/${user._id}/history`)}
                                $variant="view"
                                title="View History"
                              >
                                <FaEye />
                              </ActionButton>
                              {user.isActive ? (
                                <ActionButton
                                  onClick={() => handleBlockUser(user._id)}
                                  $variant="block"
                                  title="Block User"
                                >
                                  <FaBan />
                                </ActionButton>
                              ) : (
                                <ActionButton
                                  onClick={() => handleUnblockUser(user._id)}
                                  $variant="unblock"
                                  title="Unblock User"
                                >
                                  <FaCheckCircle />
                                </ActionButton>
                              )}
                              <ActionButton
                                onClick={() => handleDeleteUser(user._id)}
                                $variant="delete"
                                title="Delete User"
                              >
                                <FaTrash />
                              </ActionButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </UsersTable>
              </TableWrapper>
                
                {/* Pagination */}
                <PaginationContainer>
                  <PaginationInfo>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of {sortedUsers.length} users
                  </PaginationInfo>
                  <PaginationControls>
                    <PaginationButton
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </PaginationButton>
                    <PaginationNumbers>
                      {Array.from({ length: Math.ceil(sortedUsers.length / itemsPerPage) }, (_, i) => i + 1)
                        .filter(page => {
                          // Show first page, last page, current page, and pages around current
                          return page === 1 || 
                                 page === Math.ceil(sortedUsers.length / itemsPerPage) ||
                                 (page >= currentPage - 1 && page <= currentPage + 1);
                        })
                        .map((page, index, array) => {
                          // Add ellipsis if there's a gap
                          const prevPage = array[index - 1];
                          const showEllipsis = prevPage && page - prevPage > 1;
                          return (
                            <React.Fragment key={page}>
                              {showEllipsis && <span style={{ padding: "0 0.5rem" }}>...</span>}
                              <PaginationButton
                                onClick={() => setCurrentPage(page)}
                                $active={currentPage === page}
                              >
                                {page}
                              </PaginationButton>
                            </React.Fragment>
                          );
                        })}
                    </PaginationNumbers>
                    <PaginationButton
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(sortedUsers.length / itemsPerPage), prev + 1))}
                      disabled={currentPage === Math.ceil(sortedUsers.length / itemsPerPage)}
                    >
                      Next
                    </PaginationButton>
                  </PaginationControls>
                </PaginationContainer>
              </>
            )}
          </ContentContainer>
        )}
      </AdminContent>
    </AdminContainer>
  );
};

// Users Stats View Component
const UsersStatsView: React.FC<{ users: User[] }> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleExportStats = () => {
    const dataToExport = users.map(user => ({
      Name: user.name,
      Email: user.email,
      Status: !user.isActive ? "Blocked" : (!user.isVerified ? "Unverified" : "Active"),
      "Total Scans": user.stats.totalScans,
      "Total Entries": user.stats.totalEntries,
      Points: user.points,
      "Joined Date": formatDate(user.created_at),
    }));

    const header = Object.keys(dataToExport[0]).join(',');
    const csv = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(',')).join('\n');
    const fullCsv = `${header}\n${csv}`;

    const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users_stats_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Users stats exported successfully!");
  };

  const sortedUsers = [...users].sort((a, b) => b.stats.totalScans - a.stats.totalScans);

  return (
    <ContentContainer>
      <ContentHeader>
        <ContentTitle>
          All Users Statistics
        </ContentTitle>
        <ExportButton onClick={handleExportStats}>
          <FaFileDownload /> <span>Export Stats</span>
        </ExportButton>
      </ContentHeader>
      {users.length === 0 ? (
        <EmptyState>
          <FaUsers size={48} />
          <h3>No Users Found</h3>
          <p>There are no users in the system yet.</p>
        </EmptyState>
      ) : (
        <>
          <TableWrapper>
            <UsersTable>
              <TableHeader>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Total Scans</TableHeaderCell>
                <TableHeaderCell>Total Entries</TableHeaderCell>
                <TableHeaderCell>Points</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
              </TableHeader>
              <TableBody>
              {sortedUsers
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <span style={{ wordBreak: "break-word" }}>{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <StatBadge $variant="primary">{user.stats.totalScans}</StatBadge>
                    </TableCell>
                    <TableCell>
                      <StatBadge $variant="success">{user.stats.totalEntries}</StatBadge>
                    </TableCell>
                    <TableCell>
                      <StatBadge $variant="warning">{user.points}</StatBadge>
                    </TableCell>
                    <TableCell>
                      {!user.isActive ? (
                        <StatusBadge $variant="blocked">Blocked</StatusBadge>
                      ) : !user.isVerified ? (
                        <StatusBadge $variant="unverified">Unverified</StatusBadge>
                      ) : (
                        <StatusBadge $variant="active">Active</StatusBadge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </UsersTable>
          </TableWrapper>
          
          {/* Pagination */}
          <PaginationContainer>
            <PaginationInfo>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of {sortedUsers.length} users
            </PaginationInfo>
            <PaginationControls>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              <PaginationNumbers>
                {Array.from({ length: Math.ceil(sortedUsers.length / itemsPerPage) }, (_, i) => i + 1)
                  .filter(page => {
                    return page === 1 || 
                           page === Math.ceil(sortedUsers.length / itemsPerPage) ||
                           (page >= currentPage - 1 && page <= currentPage + 1);
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && <span style={{ padding: "0 0.5rem" }}>...</span>}
                        <PaginationButton
                          onClick={() => setCurrentPage(page)}
                          $active={currentPage === page}
                        >
                          {page}
                        </PaginationButton>
                      </React.Fragment>
                    );
                  })}
              </PaginationNumbers>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(sortedUsers.length / itemsPerPage), prev + 1))}
                disabled={currentPage === Math.ceil(sortedUsers.length / itemsPerPage)}
              >
                Next
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        </>
      )}
    </ContentContainer>
  );
};

// QR Code Stats View Component
const QRStatsView: React.FC<{ stats: { totalQRCodes: number; usedQRCodes: number; unusedQRCodes: number } | null; loading: boolean }> = ({ stats, loading }) => {
  if (loading) {
    return (
      <ContentContainer>
        <LoadingState>Loading QR code statistics...</LoadingState>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <ContentHeader>
        <ContentTitle>QR Code Statistics</ContentTitle>
      </ContentHeader>

      {stats ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px", 
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: "#0b3c6e", marginBottom: "0.5rem" }}>
              {stats.totalQRCodes.toLocaleString()}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#666", fontWeight: 600 }}>
              Total QR Codes
            </div>
          </div>

          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px", 
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: "#28a745", marginBottom: "0.5rem" }}>
              {stats.usedQRCodes.toLocaleString()}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#666", fontWeight: 600 }}>
              Used QR Codes
            </div>
            <div style={{ fontSize: "0.9rem", color: "#999", marginTop: "0.5rem" }}>
              {stats.totalQRCodes > 0 ? ((stats.usedQRCodes / stats.totalQRCodes) * 100).toFixed(1) : 0}% of total
            </div>
          </div>

          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px", 
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: "#ffc107", marginBottom: "0.5rem" }}>
              {stats.unusedQRCodes.toLocaleString()}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#666", fontWeight: 600 }}>
              Unused QR Codes
            </div>
            <div style={{ fontSize: "0.9rem", color: "#999", marginTop: "0.5rem" }}>
              {stats.totalQRCodes > 0 ? ((stats.unusedQRCodes / stats.totalQRCodes) * 100).toFixed(1) : 0}% of total
            </div>
          </div>
        </div>
      ) : (
        <EmptyState>
          <FaQrcode size={48} />
          <h3>No Statistics Available</h3>
          <p>Unable to load QR code statistics.</p>
        </EmptyState>
      )}
    </ContentContainer>
  );
};

export default AdminDashboard;
