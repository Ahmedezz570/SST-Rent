
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import RequireAuth from "@/components/RequireAuth";
import EquipmentHistoryPage from "./components/EquipmentHistory";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Requests from "./pages/Requests";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import ToolDetail from "./pages/ToolDetail";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/tools/:id" element={<ToolDetail />} />
                {/* <Route path="/equipment-history" element={<EquipmentHistoryPage />} /> */}
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                } />
                <Route path="/equipment" element={
                  <RequireAuth>
                    <Equipment />
                  </RequireAuth>
                } />
                <Route path="/requests" element={
                  <RequireAuth>
                    <Requests />
                  </RequireAuth>
                } />
                <Route path="/profile" element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                } />
                <Route path="/admin" element={
                  <RequireAuth requireAdmin={true}>
                    <Admin />
                  </RequireAuth>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
