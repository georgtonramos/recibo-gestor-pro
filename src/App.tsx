
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanyList from "./pages/CompanyList";
import ReceiptGenerator from "./pages/ReceiptGenerator";
import ReceiptHistory from "./pages/ReceiptHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              
              {/* Protected routes for all authenticated users */}
              <Route path="/dashboard" element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
              
              {/* Admin-only routes */}
              <Route path="/empresas" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <CompanyList />
                </RequireAuth>
              } />
              <Route path="/gerar-recibos" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <ReceiptGenerator />
                </RequireAuth>
              } />
              <Route path="/historico-recibos" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <ReceiptHistory />
                </RequireAuth>
              } />
              
              {/* Employee-only routes */}
              <Route path="/meus-recibos" element={
                <RequireAuth allowedRoles={["employee"]}>
                  <ReceiptHistory />
                </RequireAuth>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
