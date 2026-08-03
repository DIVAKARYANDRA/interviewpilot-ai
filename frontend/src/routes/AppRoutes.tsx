import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../hooks/useAuth";
import InterviewSetupPage from "../pages/InterviewSetup/InterviewSetupPage";
import InterviewPage from "../pages/Interview/InterviewPage";
import ReportPage from "../pages/Report/ReportPage";
import InterviewHistoryPage
from "./pages/history/InterviewHistoryPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/dashboard"
            element={
                isAuthenticated()

                    ?

                    <DashboardPage/>

                    :

                    <Navigate to="/login"/>
            }
        />
        <Route
            path="/register"
            element={<RegisterPage />}
        />
        <Route
            path="/interview/setup"
            element={<InterviewSetupPage/>}
        />
        <Route
            path="/interview"
            element={<InterviewPage/>}
        />

        <Route
            path="/report"
            element={<ReportPage/>}
        />

        <Route

            path="/history"

            element={<InterviewHistoryPage/>}

        />
      </Routes>
    </BrowserRouter>
  );
}