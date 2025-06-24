import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Phone,
  Clock,
  TrendingUp,
  Users,
  Star,
  Target,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
// Import extracted analytics components
import HourlyCallVolume from "@/components/analytics/HourlyCallVolume";
import CallTypeDistribution from "@/components/analytics/CallTypeDistribution";
import MyPerformance from "@/components/analytics/MyPerformance";
import RecentFeedback from "@/components/analytics/RecentFeedback";
import SlaPerformance from "@/components/analytics/SlaPerformance";

const Analytics = ({ onLogout }: { onLogout?: () => void }) => {
  // Key metrics for the top grid
  const todayMetrics = [
    {
      title: "Total Calls",
      value: "342",
      change: "+12%",
      icon: Phone,
      color: "blue",
    },
    {
      title: "Avg Handle Time",
      value: "4:23",
      change: "-8%",
      icon: Clock,
      color: "green",
    },
    {
      title: "First Call Resolution",
      value: "87%",
      change: "+5%",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      title: "Customer Satisfaction",
      value: "4.7",
      change: "+0.2",
      icon: Star,
      color: "yellow",
    },
    {
      title: "Service Level (30s)",
      value: "92%",
      change: "+3%",
      icon: Target,
      color: "purple",
    },
    {
      title: "Active Agents",
      value: "24",
      change: "+2",
      icon: Users,
      color: "indigo",
    },
  ];

  // Data for charts and cards
  const hourlyData = [
    { hour: "9 AM", calls: 45, resolved: 38 },
    { hour: "10 AM", calls: 52, resolved: 47 },
    { hour: "11 AM", calls: 38, resolved: 35 },
    { hour: "12 PM", calls: 28, resolved: 25 },
    { hour: "1 PM", calls: 35, resolved: 32 },
    { hour: "2 PM", calls: 48, resolved: 41 },
    { hour: "3 PM", calls: 56, resolved: 49 },
    { hour: "4 PM", calls: 42, resolved: 38 },
  ];

  const agentPerformance = [
    { name: "John Doe", calls: 28, avgTime: "3:45", satisfaction: 4.8 },
    { name: "Jane Smith", calls: 32, avgTime: "4:12", satisfaction: 4.6 },
    { name: "Mike Wilson", calls: 24, avgTime: "3:58", satisfaction: 4.7 },
    { name: "Sarah Lee", calls: 35, avgTime: "4:35", satisfaction: 4.9 },
    { name: "Tom Brown", calls: 29, avgTime: "4:02", satisfaction: 4.5 },
  ];

  const callTypeData = [
    { name: "Support", value: 156, color: "#3B82F6" },
    { name: "Sales", value: 89, color: "#10B981" },
    { name: "Technical", value: 67, color: "#F59E0B" },
    { name: "Billing", value: 30, color: "#EF4444" },
  ];

  const myPerformance = {
    name: "John Doe",
    calls: 28,
    avgTime: "3:45",
    satisfaction: 4.8,
    goal: 35,
  };

  const recentFeedback = [
    {
      id: 1,
      customer: "Alice Johnson",
      time: "09:15 AM",
      rating: 5,
      comment: "Great support, very helpful!",
    },
    {
      id: 2,
      customer: "Bob Smith",
      time: "10:30 AM",
      rating: 4,
      comment: "Quick response, thanks!",
    },
    {
      id: 3,
      customer: "Carol Davis",
      time: "11:45 AM",
      rating: 5,
      comment: "Resolved my issue efficiently.",
    },
  ];

  // Helper for icon color classes
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      yellow: "text-yellow-600 dark:text-yellow-400",
      purple: "text-purple-600 dark:text-purple-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
    };
    return (
      colors[color as keyof typeof colors] || "text-gray-600 dark:text-gray-400"
    );
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time performance metrics and insights
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {todayMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className="dark:bg-gray-800 dark:border-gray-700"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className={`h-5 w-5 ${getColorClasses(metric.color)}`}
                    />
                    <Badge variant="outline" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold dark:text-white">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Call Volume Bar Chart */}
          <HourlyCallVolume data={hourlyData} />
          {/* Call Types Pie Chart */}
          <CallTypeDistribution data={callTypeData} />
        </div>

        {/* My Performance Card */}
        <MyPerformance performance={myPerformance} />

        {/* Recent Feedback Card */}
        <RecentFeedback feedback={recentFeedback} />

        {/* SLA/Queue/Alerts Grid */}
        <SlaPerformance />
      </div>
    </Layout>
  );
};

export default Analytics;
