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
  const [agentStatus, setAgentStatus] = useState("available");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Employees",
      icon: Users,
      path: "/employees",
    },
    {
      title: "Call Management",
      icon: Phone,
      path: "/calls",
    },
    {
      title: "Ticket Management",
      icon: Ticket,
      path: "/tickets",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      path: "/settings",
    },
  ];

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
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 w-64">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Call Center Hub
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  location.pathname === item.path &&
                    "bg-gray-100 dark:bg-gray-700"
                )}
              >
                <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
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
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search calls, tickets, employees..."
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                  className="w-80 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                    <h4 className="font-medium dark:text-white">
                      Notifications
                    </h4>
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
              <div className="flex items-center space-x-3">
                <div className="text-sm text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    John Doe
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-6 px-2 py-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {agentStatus.charAt(0).toUpperCase() +
                            agentStatus.slice(1)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="dark:bg-gray-800 dark:border-gray-700"
                      >
                        <DropdownMenuItem
                          onClick={() => setAgentStatus("available")}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="dark:text-white">Available</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setAgentStatus("busy")}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="dark:text-white">Busy</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setAgentStatus("offline")}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                            <span className="dark:text-white">Offline</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusDot(
                      agentStatus
                    )}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
