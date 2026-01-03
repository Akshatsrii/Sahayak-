import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import SymptomChecker from "./pages/SymptomChecker";
import MedicalHistory from "./pages/MedicalHistory";
import ConsultationsPage from "./pages/ConsultationsPage";
import WomensHealthPage from "./pages/WomensHealthPage";
import EmergencyPage from "./pages/EmergencyPage";
import InstitutePage from "./pages/InstitutePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import AyurvedaPage from "./pages/AyurvedaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/ayurveda" element={<AyurvedaPage />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/womens-health" element={<WomensHealthPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/institute" element={<InstitutePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
