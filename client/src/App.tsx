import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
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
  Schedule,
  Team,
  KnowledgeBase,
} from "./pages";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const isAuthenticated = !!session;

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
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/employees"
              element={
                isAuthenticated ? (
                  <Employees onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/calls"
              element={
                isAuthenticated ? (
                  <CallManagement onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/calls/:id"
              element={
                isAuthenticated ? (
                  <CallDetails onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/tickets"
              element={
                isAuthenticated ? (
                  <TicketManagement onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? (
                  <Analytics onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/customers/:id"
              element={
                isAuthenticated ? (
                  <CustomerProfile onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/schedule"
              element={
                isAuthenticated ? (
                  <Schedule onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/team"
              element={
                isAuthenticated ? (
                  <Team onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/knowledge-base"
              element={
                isAuthenticated ? (
                  <KnowledgeBase onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
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
