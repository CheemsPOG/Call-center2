import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CallControls from "@/components/CallControls";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Phone,
  PhoneCall,
  Clock,
  TrendingUp,
  Users,
  Ticket,
  CheckCircle,
  AlertCircle,
  PhoneIncoming,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Agent {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

const teamMembers: Agent[] = [
  {
    id: 1,
    name: "Jerome Bell",
    avatar: "JB",
    online: true,
  },
  {
    id: 2,
    name: "Kathryn Murphy",
    avatar: "KM",
    online: true,
  },
  {
    id: 3,
    name: "Darrell Steward",
    avatar: "DS",
    online: false,
  },
  {
    id: 4,
    name: "Annette Brooks",
    avatar: "AB",
    online: true,
  },
];

const Dashboard = ({ onLogout }: { onLogout?: () => void }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setCurrentUser(session?.user);
    };
    fetchCurrentUser();
  }, []);

  const stats = [
    {
      title: "Active Calls",
      value: "24",
      icon: PhoneCall,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Calls Today",
      value: "156",
      icon: Phone,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Avg Response Time",
      value: "2.3s",
      icon: Clock,
      change: "-15%",
      trend: "down",
    },
    {
      title: "Customer Satisfaction",
      value: "94%",
      icon: TrendingUp,
      change: "+3%",
      trend: "up",
    },
  ];

  const recentCalls = [
    {
      id: "CALL-001",
      customer: "Alice Johnson",
      agent: "John Doe",
      status: "active",
      duration: "00:15:32",
      type: "Support",
    },
    {
      id: "CALL-002",
      customer: "Bob Smith",
      agent: "Jane Smith",
      status: "completed",
      duration: "00:08:15",
      type: "Sales",
    },
    {
      id: "CALL-003",
      customer: "Carol Davis",
      agent: "Mike Wilson",
      status: "queued",
      duration: "00:02:10",
      type: "Support",
    },
    {
      id: "CALL-004",
      customer: "David Brown",
      agent: "Sarah Lee",
      status: "active",
      duration: "00:25:43",
      type: "Technical",
    },
  ];

  const handleEndCall = () => {
    console.log("Call ended");
  };

  const handleTransferCall = () => {
    setIsTransferModalOpen(true);
  };

  const handleHoldCall = () => {
    console.log("Call put on hold");
  };

  const handleConfirmTransfer = () => {
    if (!selectedAgent) {
      toast.error("Please select an agent to transfer the call.");
      return;
    }
    console.log("Transferring call to:", selectedAgent);
    toast.success(`Call transfer initiated to ${selectedAgent}`);
    setIsTransferModalOpen(false);
    setSelectedAgent("");
  };

  const availableAgentsForTransfer = teamMembers.filter(
    (agent) =>
      agent.online && agent.name !== currentUser?.user_metadata?.full_name
  );

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening in your call center.
          </p>
        </div>

        {/* Active Call Controls */}
        <CallControls
          callId="CALL-001"
          customer="Alice Johnson"
          duration="00:15:32"
          onEndCall={handleEndCall}
          onTransfer={handleTransferCall}
          onHold={handleHoldCall}
        />

        {/* Transfer Call Modal */}
        <Dialog
          open={isTransferModalOpen}
          onOpenChange={setIsTransferModalOpen}
        >
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Transfer Call
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Select an available agent to transfer the active call.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Call with:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Alice Johnson
                </span>
              </p>
              <div className="space-y-2">
                {availableAgentsForTransfer.length > 0 ? (
                  availableAgentsForTransfer.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.name)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAgent === agent.name
                          ? "bg-blue-100 dark:bg-blue-900/50"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {agent.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">
                            {agent.name}
                          </div>
                        </div>
                      </div>
                      <Badge variant={agent.online ? "default" : "secondary"}>
                        {agent.online ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No available agents to transfer to.
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsTransferModalOpen(false)}
                className="dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmTransfer}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!selectedAgent}
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                Confirm Transfer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="dark:bg-gray-800 dark:border-gray-700"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">
                    {stat.value}
                  </div>
                  <p
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change} from last week
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Calls */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Calls</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Latest call activity in your center
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          call.status === "active"
                            ? "bg-green-100 dark:bg-green-900/50"
                            : call.status === "completed"
                            ? "bg-blue-100 dark:bg-blue-900/50"
                            : "bg-yellow-100 dark:bg-yellow-900/50"
                        }`}
                      >
                        {call.status === "active" ? (
                          <PhoneCall className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : call.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium dark:text-white">
                          {call.customer}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {call.agent} • {call.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          call.status === "active"
                            ? "default"
                            : call.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {call.status}
                      </Badge>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {call.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agent Status */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Agent Status</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Current status of your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {agent.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium dark:text-white">
                          {agent.name}
                        </div>
                      </div>
                    </div>
                    <Badge variant={agent.online ? "default" : "secondary"}>
                      {agent.online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Status */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Call Queue Status</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Current queue performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white">
                    Queue Length
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    12 calls
                  </span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white">
                    Avg Wait Time
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    3:24
                  </span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white">
                    Service Level
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    87%
                  </span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
