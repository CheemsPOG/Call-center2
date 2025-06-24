import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Phone,
  Users,
  BarChart3,
  Ticket,
  LogOut,
  Menu,
  Bell,
  Search,
  Circle,
  Check,
  Trash2,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  Star,
  Sun,
  Moon,
  Settings as SettingsIcon,
  LayoutDashboard,
  X,
  Calendar,
  Zap,
  ChevronDown,
  BookText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/contexts/UserProfileContext";

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "call" | "message" | "alert" | "rating";
  read: boolean;
}

const Layout = ({ children, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agentStatus, setAgentStatus] = useState("Available");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const { profileImage } = useUserProfile();

  useEffect(() => {
    // Fetch notifications from backend API
    fetch("http://localhost:4000/notifications")
      .then((res) => res.json())
      .then((data) => {
        // Convert time to a readable string for UI
        const formatted = data.map((n: any) => ({
          ...n,
          time: new Date(n.time).toLocaleString(),
        }));
        setNotifications(formatted);
      })
      .catch((err) => {
        // Optionally handle error
        setNotifications([]);
      });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Fetch agent status from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/agent-status")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setAgentStatus(data.status);
      })
      .catch(() => setAgentStatus("Available"));
  }, []);

  // Update agent status in backend and state
  const handleStatusChange = (status: string) => {
    fetch("http://localhost:4000/agent-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setAgentStatus(data.status);
      });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    // {
    //   title: "Employees",
    //   icon: Users,
    //   path: "/employees",
    // },
    {
      title: "Call Management",
      icon: Phone,
      path: "/calls",
    },
    // {
    //   title: "Ticket Management",
    //   icon: Ticket,
    //   path: "/tickets",
    // },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Team",
      icon: Users,
      path: "/team",
    },
    {
      title: "Schedule",
      icon: Calendar,
      path: "/schedule",
    },
    {
      title: "Knowledge Base",
      icon: BookText,
      path: "/knowledge-base",
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      path: "/settings",
    },
  ];
  // Employees and Ticket Management are hidden from the sidebar as requested.

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "offline":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Busy":
        return "bg-yellow-500";
      case "Offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "call":
        return <PhoneCall className="h-4 w-4 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "rating":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = async (id: number) => {
    // Call backend to mark notification as read
    await fetch(`http://localhost:4000/notifications/${id}/read`, {
      method: "PATCH",
    });
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = async (id: number) => {
    // Call backend to delete notification
    await fetch(`http://localhost:4000/notifications/${id}`, {
      method: "DELETE",
    });
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    // Set initial state
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform shadow-lg rounded-r-2xl bg-gradient-to-b from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-800",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "w-64 md:w-64 sm:w-56 xs:w-56"
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto w-64 md:w-64 sm:w-56 xs:w-56">
          <div className="flex items-center justify-between mb-6 bg-blue-600 dark:bg-blue-900 rounded-xl px-2 py-2 shadow-md border border-blue-200 dark:border-blue-800">
            <div className="flex items-center flex-nowrap">
              <div className="bg-blue-600 dark:bg-blue-900 p-1 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-white whitespace-nowrap">
                Call Center Demo
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-2 mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group font-medium",
                  location.pathname === item.path &&
                    "bg-blue-100 dark:bg-gray-700 shadow-sm border border-blue-200 dark:border-gray-700"
                )}
              >
                <item.icon className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-white transition-colors duration-200" />
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-4 left-0 right-0 px-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="block md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 sm:ml-56 xs:ml-0 ml-0 transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-8 py-3 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 md:gap-0 sticky top-0 z-30 rounded-b-2xl">
          {/* Top bar left: Quick features instead of search */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Removed Schedule and Quick Actions buttons */}
          </div>
          {/* Responsive icon/user section spacing */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-0 px-1 sm:px-2 md:px-0 w-full md:w-auto justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 max-w-[95vw] dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                  <h4 className="font-medium dark:text-white">Notifications</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    Mark all as read
                  </Button>
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.length > 0 ? (
                    <div className="p-1">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.read
                              ? "bg-transparent"
                              : "bg-blue-50 dark:bg-blue-900/20"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  {notification.time}
                                </p>
                                <div className="flex items-center space-x-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs dark:text-gray-300 dark:hover:bg-gray-700"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Mark as read
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  )}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu
              open={isAvatarMenuOpen}
              onOpenChange={setIsAvatarMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative flex items-center p-0 h-8 w-auto group focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="relative">
                    {/* Show profile image if available, otherwise initials */}
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          JD
                        </span>
                      </div>
                    )}
                    {/* Status dot absolutely positioned at bottom right of avatar */}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusDot(
                        agentStatus
                      )}`}
                      style={{ transform: "translate(30%, 30%)" }}
                    />
                  </div>
                  <ChevronDown
                    className={`ml-1 w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 group-focus:text-blue-600 transition-transform duration-200 ${
                      isAvatarMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark:bg-gray-800 dark:border-gray-700 w-48"
              >
                <DropdownMenuItem
                  onClick={() => handleStatusChange("Available")}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="dark:text-white">Available</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Busy")}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="dark:text-white">Busy</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Offline")}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="dark:text-white">Offline</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <SettingsIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-300" />
                  <span className="dark:text-white">Profile Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Agent Quick Actions Modal */}
        {/* Removed Quick Actions modal/card */}
        {/* Page Content */}
        <main className="p-2 sm:p-4 md:p-6 max-w-full overflow-x-auto min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
      {/* Responsive overlay for sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Responsive styles for xs/sm devices */}
      <style>{`
        @media (max-width: 768px) {
          .ml-64, .md\:ml-64 { margin-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .w-64, .md\:w-64, .sm\:w-56, .xs\:w-56 { width: 100vw !important; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
