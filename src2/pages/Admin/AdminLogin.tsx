import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiService } from "../../services/api";
import { login } from "../../redux/slices/auth";
import { RootState } from "../../redux/store";
import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginForm,
  FormGroup,
  FormLabel,
  FormInput,
  LoginButton,
  ErrorMessage,
  BackLink,
} from "./AdminLogin.styles";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiService.adminLogin(email, password);
      
      // Store in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user._id);
      localStorage.setItem("username", response.user.name);
      localStorage.setItem("role", response.user.role);

      // Update Redux state
      dispatch(
        login({
          token: response.token,
          userId: response.user._id,
          username: response.user.name,
          role: response.user.role,
        })
      );

      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Admin login error:", error);
      setError(error.message || "Invalid credentials");
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <BackLink onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Home
        </BackLink>
        <LoginTitle>Admin Login</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <FormGroup>
            <FormLabel>
              <FaEnvelope /> Email
            </FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <FaLock /> Password
            </FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          <LoginButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login as Admin"}
          </LoginButton>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
