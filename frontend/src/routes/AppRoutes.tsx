import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
            path="/register"
            element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}