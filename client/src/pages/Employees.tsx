import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Employee form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "customer support",
    status: "available",
    phone: "",
    location: "",
    joinDate: "",
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<any | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:4000/employees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, join_date: form.joinDate }),
      });
      if (!res.ok) throw new Error("Failed to add employee");
      const newEmployee = await res.json();
      setEmployees((prev) => [...prev, newEmployee]);
      setForm({
        name: "",
        email: "",
        role: "",
        department: "customer support",
        status: "available",
        phone: "",
        location: "",
        joinDate: "",
      });
      setIsAddDialogOpen(false);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

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

  // Add delete handler
  const handleDeleteEmployee = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/employees/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  // Edit handler
  const handleEditEmployee = (employee: any) => {
    setEditEmployee(employee);
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      status: employee.status,
      phone: employee.phone,
      location: employee.location,
      joinDate: employee.join_date || employee.joinDate || "",
    });
    setIsEditDialogOpen(true);
  };

  // Update employee handler
  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmployee) return;
    try {
      const res = await fetch(
        `http://localhost:4000/employees/${editEmployee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, join_date: form.joinDate }),
        }
      );
      if (!res.ok) throw new Error("Failed to update employee");
      const updated = await res.json();
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updated.id ? updated : emp))
      );
      setIsEditDialogOpen(false);
      setEditEmployee(null);
      setForm({
        name: "",
        email: "",
        role: "",
        department: "customer support",
        status: "available",
        phone: "",
        location: "",
        joinDate: "",
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

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
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={() => setIsAddDialogOpen(true)}
          >
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
              {loading
                ? "Loading..."
                : error
                ? error
                : `${filteredEmployees.length} employees`}
              {departmentFilter !== "all" && ` in ${departmentFilter}`}
              {statusFilter !== "all" && ` (${statusFilter})`}
              {searchQuery && ` matching \"${searchQuery}\"`}
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-red-500">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No employees found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
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
                                .map((n: string) => n[0])
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
                        {employee.calls_today ?? employee.callsToday}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="dark:hover:bg-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditEmployee(employee)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:bg-red-100 dark:focus:bg-red-900"
                              onClick={() => handleDeleteEmployee(employee.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Employee Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Add Employee
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Enter the details for the new employee.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Name
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Role
                </label>
                <Input
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition"
                >
                  <option value="customer support">Customer Support</option>
                  <option value="technical support">Technical Support</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Phone
                </label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Location
                </label>
                <Input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Join Date
                </label>
                <Input
                  name="joinDate"
                  type="date"
                  value={form.joinDate}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Edit Employee Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Edit Employee
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Update the details for the employee.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateEmployee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Name
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Role
                </label>
                <Input
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition"
                >
                  <option value="customer support">Customer Support</option>
                  <option value="technical support">Technical Support</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Phone
                </label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Location
                </label>
                <Input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Join Date
                </label>
                <Input
                  name="joinDate"
                  type="date"
                  value={form.joinDate}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Update
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Employees;
