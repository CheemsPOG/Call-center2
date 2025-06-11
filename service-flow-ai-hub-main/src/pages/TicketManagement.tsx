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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Ticket,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react";

const TicketManagement = () => {
  const tickets = [
    {
      id: "TKT-001",
      title: "Account access issues - Password reset failed",
      customer: "Alice Johnson",
      agent: "John Doe",
      priority: "high",
      status: "open",
      category: "Account Access",
      created: "2024-01-15 09:15:00",
      updated: "2024-01-15 09:45:00",
      callId: "CALL-001",
      description:
        "Customer unable to access account due to forgotten password. Multiple reset attempts failed.",
    },
    {
      id: "TKT-002",
      title: "Billing inquiry - Unexpected charges",
      customer: "Carol Davis",
      agent: "Jane Smith",
      priority: "medium",
      status: "in-progress",
      category: "Billing",
      created: "2024-01-15 08:30:00",
      updated: "2024-01-15 10:15:00",
      callId: "CALL-003",
      description:
        "Customer questioning charges on recent bill. Needs detailed breakdown.",
    },
    {
      id: "TKT-003",
      title: "Technical support - Software malfunction",
      customer: "David Brown",
      agent: "Sarah Lee",
      priority: "high",
      status: "escalated",
      category: "Technical",
      created: "2024-01-15 07:45:00",
      updated: "2024-01-15 09:30:00",
      callId: "CALL-004",
      description:
        "Customer experiencing software crashes and data loss. Escalated to Level 2 support.",
    },
    {
      id: "TKT-004",
      title: "Product information request",
      customer: "Bob Smith",
      agent: "Mike Wilson",
      priority: "low",
      status: "resolved",
      category: "Sales",
      created: "2024-01-14 15:20:00",
      updated: "2024-01-15 08:45:00",
      callId: "CALL-002",
      description:
        "Customer requested detailed product specifications and pricing information.",
    },
    {
      id: "TKT-005",
      title: "Service cancellation request",
      customer: "Emma Wilson",
      agent: "John Doe",
      priority: "medium",
      status: "pending",
      category: "Account Management",
      created: "2024-01-15 10:00:00",
      updated: "2024-01-15 10:30:00",
      callId: "CALL-005",
      description:
        "Customer wants to cancel subscription. Awaiting retention team review.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "escalated":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Ticket className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "escalated":
        return <AlertCircle className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Ticket className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ticket Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track and resolve customer support tickets
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Ticket Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Open
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
                  In Progress
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Escalated
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Resolved
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  2.5h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Resolution
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
                  placeholder="Search tickets..."
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="open"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Open
                  </SelectItem>
                  <SelectItem
                    value="in-progress"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    In Progress
                  </SelectItem>
                  <SelectItem
                    value="escalated"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Escalated
                  </SelectItem>
                  <SelectItem
                    value="resolved"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Resolved
                  </SelectItem>
                  <SelectItem
                    value="pending"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Pending
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    All Priority
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    High
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Medium
                  </SelectItem>
                  <SelectItem
                    value="low"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    All Categories
                  </SelectItem>
                  <SelectItem
                    value="account"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Account Access
                  </SelectItem>
                  <SelectItem
                    value="billing"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </SelectItem>
                  <SelectItem
                    value="technical"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Technical
                  </SelectItem>
                  <SelectItem
                    value="sales"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Sales
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

        {/* Tickets Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">All Tickets</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Complete list of support tickets from calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-300">
                    Ticket ID
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    Title & Customer
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    Assigned Agent
                  </TableHead>
                  <TableHead className="dark:text-gray-300">Status</TableHead>
                  <TableHead className="dark:text-gray-300">Priority</TableHead>
                  <TableHead className="dark:text-gray-300">Category</TableHead>
                  <TableHead className="dark:text-gray-300">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="dark:border-gray-700 dark:hover:bg-gray-700/50"
                  >
                    <TableCell className="font-medium dark:text-white">
                      {ticket.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium dark:text-white">
                        {ticket.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {ticket.customer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                            {ticket.agent
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="dark:text-white">{ticket.agent}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          ticket.status
                        )} dark:bg-opacity-20`}
                      >
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getPriorityColor(
                          ticket.priority
                        )} dark:bg-opacity-20`}
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {ticket.category}
                    </TableCell>
                    <TableCell>
                      <div className="dark:text-white">{ticket.created}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Updated: {ticket.updated}
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

export default TicketManagement;
