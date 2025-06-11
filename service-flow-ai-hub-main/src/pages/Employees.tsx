import { useState } from "react";
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
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Senior Agent",
      department: "Customer Support",
      status: "available",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      callsToday: 15,
      totalCalls: 1240,
      rating: 4.9,
      joinDate: "2022-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Team Lead",
      department: "Technical Support",
      status: "busy",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      callsToday: 8,
      totalCalls: 2150,
      rating: 4.8,
      joinDate: "2021-06-10",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "Agent",
      department: "Sales",
      status: "available",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      callsToday: 12,
      totalCalls: 890,
      rating: 4.7,
      joinDate: "2022-09-20",
    },
    {
      id: 4,
      name: "Sarah Lee",
      email: "sarah.lee@company.com",
      role: "Senior Agent",
      department: "Customer Support",
      status: "offline",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      callsToday: 0,
      totalCalls: 1680,
      rating: 4.9,
      joinDate: "2021-11-05",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@company.com",
      role: "Agent",
      department: "Technical Support",
      status: "available",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      callsToday: 9,
      totalCalls: 650,
      rating: 4.6,
      joinDate: "2023-02-14",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmployees = employees
    .filter(
      (employee) =>
        departmentFilter === "all" ||
        employee.department.toLowerCase() === departmentFilter.toLowerCase()
    )
    .filter(
      (employee) => statusFilter === "all" || employee.status === statusFilter
    )
    .filter((employee) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.phone.toLowerCase().includes(searchLower) ||
        employee.location.toLowerCase().includes(searchLower)
      );
    });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Employee Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your call center team and track performance
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, role, phone, or location..."
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    All Departments
                  </SelectItem>
                  <SelectItem
                    value="customer support"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Customer Support
                  </SelectItem>
                  <SelectItem
                    value="technical support"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Technical Support
                  </SelectItem>
                  <SelectItem
                    value="sales"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Sales
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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
                    value="available"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Available
                  </SelectItem>
                  <SelectItem
                    value="busy"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Busy
                  </SelectItem>
                  <SelectItem
                    value="offline"
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    Offline
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

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {
                    filteredEmployees.filter((e) => e.status === "available")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Available
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {filteredEmployees.filter((e) => e.status === "busy").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Busy
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {
                    filteredEmployees.filter((e) => e.status === "offline")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Offline
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredEmployees.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Employees
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">All Employees</CardTitle>
            <CardDescription className="dark:text-gray-400">
              {filteredEmployees.length} employees
              {departmentFilter !== "all" && ` in ${departmentFilter}`}
              {statusFilter !== "all" && ` (${statusFilter})`}
              {searchQuery && ` matching "${searchQuery}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="dark:text-gray-300">Employee</TableHead>
                  <TableHead className="dark:text-gray-300">
                    Role & Department
                  </TableHead>
                  <TableHead className="dark:text-gray-300">Contact</TableHead>
                  <TableHead className="dark:text-gray-300">Status</TableHead>
                  <TableHead className="dark:text-gray-300">
                    Today's Calls
                  </TableHead>
                  <TableHead className="dark:text-gray-300">Rating</TableHead>
                  <TableHead className="dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="dark:border-gray-700 dark:hover:bg-gray-700/50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white dark:bg-blue-700">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium dark:text-white">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium dark:text-white">
                          {employee.role}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm dark:text-gray-300">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {employee.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {employee.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          employee.status
                        )} dark:bg-opacity-20`}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {employee.callsToday}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="dark:text-white">
                          {employee.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="dark:hover:bg-gray-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

export default Employees;
