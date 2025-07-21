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
import { UserProfileProvider } from "@/contexts/UserProfileContext";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // Add guest mode state, initialized from localStorage
  const [guestMode, setGuestMode] = useState(
    () => localStorage.getItem("guest_mode") === "true"
  );

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

    // Listen for guest mode changes (e.g., from logout in another tab)
    const onStorage = () =>
      setGuestMode(localStorage.getItem("guest_mode") === "true");
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      subscription.unsubscribe();
    };
  }, []);

  // Allow access if authenticated or in guest mode
  const isAuthenticatedOrGuest = !!session || guestMode;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Clear guest mode on logout
    localStorage.removeItem("guest_mode");
    setGuestMode(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <UserProfileProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  !isAuthenticatedOrGuest ? (
                    <Login />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticatedOrGuest ? (
                    <Dashboard onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/employees"
                element={
                  isAuthenticatedOrGuest ? (
                    <Employees onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/calls"
                element={
                  isAuthenticatedOrGuest ? (
                    <CallManagement onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/calls/:id"
                element={
                  isAuthenticatedOrGuest ? (
                    <CallDetails onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/tickets"
                element={
                  isAuthenticatedOrGuest ? (
                    <TicketManagement onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/settings"
                element={
                  isAuthenticatedOrGuest ? (
                    <Settings onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/analytics"
                element={
                  isAuthenticatedOrGuest ? (
                    <Analytics onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/customers/:id"
                element={
                  isAuthenticatedOrGuest ? (
                    <CustomerProfile onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/schedule"
                element={
                  isAuthenticatedOrGuest ? (
                    <Schedule onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/team"
                element={
                  isAuthenticatedOrGuest ? (
                    <Team onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/knowledge-base"
                element={
                  isAuthenticatedOrGuest ? (
                    <KnowledgeBase onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </UserProfileProvider>
  );
};

export default App;
