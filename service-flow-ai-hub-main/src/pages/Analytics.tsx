
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

const Analytics = () => {
  const todayMetrics = [
    { title: "Total Calls", value: "342", change: "+12%", icon: Phone, color: "blue" },
    { title: "Avg Handle Time", value: "4:23", change: "-8%", icon: Clock, color: "green" },
    { title: "First Call Resolution", value: "87%", change: "+5%", icon: CheckCircle, color: "emerald" },
    { title: "Customer Satisfaction", value: "4.7", change: "+0.2", icon: Star, color: "yellow" },
    { title: "Service Level (30s)", value: "92%", change: "+3%", icon: Target, color: "purple" },
    { title: "Active Agents", value: "24", change: "+2", icon: Users, color: "indigo" },
  ];

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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      yellow: "text-yellow-600 dark:text-yellow-400",
      purple: "text-purple-600 dark:text-purple-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
    };
    return colors[color as keyof typeof colors] || "text-gray-600 dark:text-gray-400";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time performance metrics and insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {todayMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${getColorClasses(metric.color)}`} />
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
          {/* Hourly Call Volume */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Hourly Call Volume</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Calls received vs resolved today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#3B82F6" name="Received" />
                  <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Call Types Distribution */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Call Distribution</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Breakdown by call type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={callTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {callTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Agent Performance */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Agent Performance Today</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Individual agent metrics and rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={agent.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">{agent.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {agent.calls} calls handled
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium dark:text-white">{agent.avgTime}</div>
                      <div className="text-gray-500 dark:text-gray-400">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium dark:text-white flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {agent.satisfaction}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">Rating</div>
                    </div>
                    <div className="text-center">
                      <Progress value={(agent.calls / 35) * 100} className="w-20" />
                      <div className="text-gray-500 dark:text-gray-400">Goal Progress</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Service Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="dark:text-gray-300">Answered within 30s</span>
                    <span className="dark:text-white">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="dark:text-gray-300">Target: 90%</span>
                    <Badge className="bg-green-100 text-green-800">Above Target</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Queue Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm dark:text-gray-300">Calls in Queue</span>
                  <span className="font-medium dark:text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm dark:text-gray-300">Longest Wait</span>
                  <span className="font-medium dark:text-white">2:15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm dark:text-gray-300">Avg Wait Time</span>
                  <span className="font-medium dark:text-white">0:45</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm dark:text-gray-300">High queue volume</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm dark:text-gray-300">All systems operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
