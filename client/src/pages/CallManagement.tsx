import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Phone,
  PhoneCall,
  Clock,
  Search,
  Filter,
  Play,
  Pause,
  Eye,
  Volume2,
  Users,
} from "lucide-react";

const CallManagement = ({ onLogout }: { onLogout?: () => void }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [isNewCallDialogOpen, setIsNewCallDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callCategory, setCallCategory] = useState("support");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNewCall = () => {
    // Here you would typically make an API call to initiate the call
    console.log("Initiating call to:", phoneNumber, "Category:", callCategory);
    setIsNewCallDialogOpen(false);
    setPhoneNumber("");
    setCallCategory("support");
  };

  const calls = [
    {
      id: "CALL-001",
      customerId: "CUST-001",
      customer: "Alice Johnson",
      customerPhone: "+1 (555) 901-2345",
      agent: "John Doe",
      type: "Inbound",
      category: "Support",
      status: "active",
      duration: "00:15:32",
      startTime: "2024-01-15 09:15:00",
      priority: "high",
      subject: "Account access issues",
    },
    {
      id: "CALL-002",
      customerId: "CUST-002",
      customer: "Bob Smith",
      customerPhone: "+1 (555) 234-5678",
      agent: "Jane Smith",
      type: "Outbound",
      category: "Sales",
      status: "completed",
      duration: "00:08:15",
      startTime: "2024-01-15 10:30:00",
      priority: "medium",
      subject: "Product inquiry",
    },
    {
      id: "CALL-003",
      customerId: "CUST-003",
      customer: "Carol Davis",
      customerPhone: "+1 (555) 345-6789",
      agent: "Mike Wilson",
      type: "Inbound",
      category: "Technical",
      status: "queued",
      duration: "00:02:10",
      startTime: "2024-01-15 11:45:00",
      priority: "low",
      subject: "Software installation help",
    },
    {
      id: "CALL-004",
      customer: "David Brown",
      customerPhone: "+1 (555) 904-5678",
      agent: "Sarah Lee",
      type: "Inbound",
      category: "Technical",
      status: "active",
      duration: "00:25:43",
      startTime: "2024-01-15 09:05:00",
      priority: "high",
      subject: "Technical support request",
    },
    {
      id: "CALL-005",
      customer: "Emma Wilson",
      customerPhone: "+1 (555) 905-6789",
      agent: "Mike Wilson",
      type: "Inbound",
      category: "Support",
      status: "on-hold",
      duration: "00:12:20",
      startTime: "2024-01-15 09:20:00",
      priority: "low",
      subject: "General inquiry",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "queued":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCalls = calls
    .filter((call) => filter === "all" || call.status === filter)
    .filter((call) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        call.customer.toLowerCase().includes(searchLower) ||
        call.customerPhone.toLowerCase().includes(searchLower) ||
        call.subject.toLowerCase().includes(searchLower)
      );
    });

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Call Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage all active and recent calls
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={() => setIsNewCallDialogOpen(true)}
          >
            <Phone className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>

        {/* New Call Dialog */}
        <Dialog
          open={isNewCallDialogOpen}
          onOpenChange={setIsNewCallDialogOpen}
        >
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Initiate New Call
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Enter the phone number to start a new outbound call
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  Call Category
                </label>
                <Select value={callCategory} onValueChange={setCallCategory}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem
                      value="support"
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      Support
                    </SelectItem>
                    <SelectItem
                      value="sales"
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      Sales
                    </SelectItem>
                    <SelectItem
                      value="technical"
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      Technical
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsNewCallDialogOpen(false)}
                className="dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewCall}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                disabled={!phoneNumber}
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                Start Call
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Call Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  2
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Calls
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  In Queue
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  On Hold
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3:24
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Wait
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, phone, or subject..."
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    All Calls
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="queued"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Queued
                  </SelectItem>
                  <SelectItem
                    value="on-hold"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    On Hold
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calls Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">All Calls</CardTitle>
            <CardDescription className="dark:text-gray-400">
              {filteredCalls.length} calls{" "}
              {filter !== "all" && `(filtered by ${filter})`}
              {searchQuery && ` matching "${searchQuery}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-300">Call ID</TableHead>
                  <TableHead className="dark:text-gray-300">Customer</TableHead>
                  <TableHead className="dark:text-gray-300">Agent</TableHead>
                  <TableHead className="dark:text-gray-300">
                    Type & Category
                  </TableHead>
                  <TableHead className="dark:text-gray-300">Status</TableHead>
                  <TableHead className="dark:text-gray-300">Duration</TableHead>
                  <TableHead className="dark:text-gray-300">Priority</TableHead>
                  <TableHead className="dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow
                    key={call.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700"
                  >
                    <TableCell className="font-medium dark:text-white">
                      {call.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div
                          className="font-medium dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() =>
                            navigate(`/customers/${call.customerId}`)
                          }
                        >
                          {call.customer}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {call.customerPhone}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">
                          {call.subject}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {call.agent !== "Waiting..." ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">
                                {call.agent
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="dark:text-white">
                              {call.agent}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">
                            {call.agent}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium dark:text-white">
                          {call.type}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {call.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          call.status
                        )} dark:bg-opacity-20`}
                      >
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {call.duration}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getPriorityColor(
                          call.priority
                        )} dark:bg-opacity-20`}
                      >
                        {call.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="dark:hover:bg-gray-700"
                          onClick={() => navigate(`/calls/${call.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {call.status === "active" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="dark:hover:bg-gray-700"
                            >
                              <Pause className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="dark:hover:bg-gray-700"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CallManagement;
