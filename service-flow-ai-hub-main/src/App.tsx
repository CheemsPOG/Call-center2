import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  Login,
  Dashboard,
  Employees,
  CallManagement,
  CallDetails,
  TicketManagement,
  Settings,
  NotFound,
  Analytics,
  CustomerProfile,
} from "./pages";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login onLogin={() => setIsAuthenticated(true)} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/employees"
              element={
                isAuthenticated ? <Employees /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/calls"
              element={
                isAuthenticated ? <CallManagement /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/calls/:id"
              element={
                isAuthenticated ? <CallDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tickets"
              element={
                isAuthenticated ? (
                  <TicketManagement />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? <Analytics /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/customers/:id"
              element={
                isAuthenticated ? <CustomerProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
