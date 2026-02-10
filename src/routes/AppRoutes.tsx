import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import History from "../pages/History/History";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserHistory from "../pages/Admin/UserHistory";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-conditions" element={<Terms />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users/:userId/history" element={<UserHistory />} />
    </Routes>
  );
};

export default AppRoutes;
