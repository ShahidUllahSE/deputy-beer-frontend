const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      
      // Handle 401 (Unauthorized) - token expired or invalid
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        throw new Error('Session expired. Please sign in again.');
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: {
    name: string;
    email: string;
    password: string;
    date_of_birth: string;
    is_over_18: boolean;
  }) {
    return this.request<{
      message: string;
      user: { _id: string; name: string; email: string };
    }>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    return this.request<{
      message: string;
      token: string;
      user: {
        _id: string;
        name: string;
        email: string;
        entries_count: number;
        role?: string;
      };
    }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verifyOTP(email: string, otp: string) {
    return this.request<{
      message: string;
      user: { _id: string; name: string; email: string };
    }>('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async resendOTP(email: string) {
    return this.request<{
      message: string;
    }>('/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{
      message: string;
      status: string;
    }>('/health', {
      method: 'GET',
    });
  }

  // QR Code endpoints
  async validateQRCode(code: string) {
    return this.request<{
      message: string;
      isValid: boolean;
    }>('/validate', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async submitEntry(qrCodes: string[]) {
    return this.request<{
      message: string;
      entry: {
        _id: string;
        qrCodes: string[];
        submittedAt: string;
        weekNumber: number;
      };
    }>('/submit-entry', {
      method: 'POST',
      body: JSON.stringify({ qrCodes }),
    });
  }

  async getUserEntries() {
    return this.request<{
      message: string;
      entries: any[];
      count: number;
    }>('/entries', {
      method: 'GET',
    });
  }

  async getUserScanHistory() {
    return this.request<{
      message: string;
      history: Array<{
        _id: string;
        qrCode: string;
        points_earned: number;
        type: string;
        scannedAt: string;
        createdAt: string;
      }>;
      count: number;
    }>('/scan-history', {
      method: 'GET',
    });
  }

  // Admin endpoints
  async adminLogin(email: string, password: string) {
    return this.request<{
      message: string;
      token: string;
      user: {
        _id: string;
        name: string;
        email: string;
        role: string;
      };
    }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getAllUsers() {
    return this.request<{
      message: string;
      users: Array<{
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
      }>;
      count: number;
    }>('/admin/users', {
      method: 'GET',
    });
  }

  async getUserHistory(userId: string) {
    return this.request<{
      message: string;
      history: Array<any>;
      user: {
        name: string;
        email: string;
      } | null;
      count: number;
    }>(`/admin/users/${userId}/history`, {
      method: 'GET',
    });
  }

  async blockUser(userId: string) {
    return this.request<{
      message: string;
      user: {
        _id: string;
        name: string;
        email: string;
        isActive: boolean;
      };
    }>(`/admin/users/${userId}/block`, {
      method: 'PATCH',
    });
  }

  async unblockUser(userId: string) {
    return this.request<{
      message: string;
      user: {
        _id: string;
        name: string;
        email: string;
        isActive: boolean;
      };
    }>(`/admin/users/${userId}/unblock`, {
      method: 'PATCH',
    });
  }

  async deleteUser(userId: string) {
    return this.request<{
      message: string;
      result: any;
    }>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getQRCodeStats() {
    return this.request<{
      message: string;
      stats: {
        totalQRCodes: number;
        usedQRCodes: number;
        unusedQRCodes: number;
      };
    }>('/admin/qr-stats', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
