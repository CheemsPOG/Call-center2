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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { calls } from "@/lib/mockData";

const CallManagement = ({ onLogout }: { onLogout?: () => void }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [isNewCallDialogOpen, setIsNewCallDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callCategory, setCallCategory] = useState("support");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);

  const handleNewCall = () => {
    // Here you would typically make an API call to initiate the call
    console.log("Initiating call to:", phoneNumber, "Category:", callCategory);
    setIsNewCallDialogOpen(false);
    setPhoneNumber("");
    setCallCategory("support");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400";
      case "queued":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400";
      case "on-hold":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
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
    })
    .filter((call) =>
      typeFilter.length === 0 ? true : typeFilter.includes(call.type)
    )
    .filter((call) =>
      categoryFilter.length === 0
        ? true
        : categoryFilter.includes(call.category)
    )
    .filter((call) =>
      priorityFilter.length === 0
        ? true
        : priorityFilter.includes(call.priority)
    );

  const clearAllFilters = () => {
    setTypeFilter([]);
    setCategoryFilter([]);
    setPriorityFilter([]);
  };

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean
  ) => {
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 dark:bg-gray-800 dark:border-gray-700"
                >
                  <DropdownMenuLabel>Call Type</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter.includes("Inbound")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setTypeFilter, "Inbound", checked)
                    }
                  >
                    Inbound
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter.includes("Outbound")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setTypeFilter, "Outbound", checked)
                    }
                  >
                    Outbound
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={categoryFilter.includes("Support")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setCategoryFilter, "Support", checked)
                    }
                  >
                    Support
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={categoryFilter.includes("Sales")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setCategoryFilter, "Sales", checked)
                    }
                  >
                    Sales
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={categoryFilter.includes("Technical")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(
                        setCategoryFilter,
                        "Technical",
                        checked
                      )
                    }
                  >
                    Technical
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilter.includes("high")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setPriorityFilter, "high", checked)
                    }
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilter.includes("medium")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setPriorityFilter, "medium", checked)
                    }
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilter.includes("low")}
                    onCheckedChange={(checked) =>
                      handleFilterChange(setPriorityFilter, "low", checked)
                    }
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAllFilters}
                    className="text-red-600 dark:text-red-400"
                  >
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Show active filters as badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {typeFilter.map((t) => (
                <Badge
                  key={t}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {t}
                </Badge>
              ))}
              {categoryFilter.map((c) => (
                <Badge
                  key={c}
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {c}
                </Badge>
              ))}
              {priorityFilter.map((p) => (
                <Badge
                  key={p}
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Badge>
              ))}
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
                          onClick={() =>
                            navigate(`/calls/${call.id}`, { state: { call } })
                          }
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
