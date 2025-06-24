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
import StatsGrid from "../components/dashboard/StatsGrid";
import RecentCalls from "../components/dashboard/RecentCalls";
import AgentStatus from "../components/dashboard/AgentStatus";
import QueueStatus from "../components/dashboard/QueueStatus";
import TransferCallDialog from "../components/dashboard/TransferCallDialog";

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
        <TransferCallDialog
          open={isTransferModalOpen}
          onOpenChange={setIsTransferModalOpen}
          availableAgents={availableAgentsForTransfer}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          onConfirm={handleConfirmTransfer}
        />

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Calls */}
          <RecentCalls recentCalls={recentCalls} />

          {/* Agent Status */}
          <AgentStatus teamMembers={teamMembers} />
        </div>

        {/* Queue Status */}
        <QueueStatus />
      </div>
    </Layout>
  );
};

export default Dashboard;
