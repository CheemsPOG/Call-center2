import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CallsTable from "@/components/callmanagement/CallsTable";
import CallsFilters from "@/components/callmanagement/CallsFilters";
import NewCallDialog from "@/components/callmanagement/NewCallDialog";
import { calls } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

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

  // Handler for starting a new call
  const handleNewCall = () => {
    // Here you would typically make an API call to initiate the call
    console.log("Initiating call to:", phoneNumber, "Category:", callCategory);
    setIsNewCallDialogOpen(false);
    setPhoneNumber("");
    setCallCategory("support");
  };

  // Filtering logic
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

  // Stats for cards (static as in original)
  const stats = [
    {
      label: "Active Calls",
      value: 2,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "In Queue",
      value: 1,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "On Hold",
      value: 1,
      color: "text-orange-600 dark:text-orange-400",
    },
    { label: "Completed", value: 1, color: "text-blue-600 dark:text-blue-400" },
    {
      label: "Avg Wait",
      value: "3:24",
      color: "text-gray-900 dark:text-white",
    },
  ];

  // Clear all filters
  const clearAllFilters = () => {
    setTypeFilter([]);
    setCategoryFilter([]);
    setPriorityFilter([]);
  };

  // Handle filter checkbox changes
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean
  ) => {
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handler for viewing a call (navigates to details)
  const handleViewCall = (call) => {
    navigate(`/calls/${call.id}`, { state: { call } });
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

        {/* New Call Dialog */}
        <NewCallDialog
          open={isNewCallDialogOpen}
          onOpenChange={setIsNewCallDialogOpen}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          callCategory={callCategory}
          setCallCategory={setCallCategory}
          onStart={handleNewCall}
          onCancel={() => setIsNewCallDialogOpen(false)}
        />

        {/* Filters Bar */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <CallsFilters
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              clearAllFilters={clearAllFilters}
              handleFilterChange={handleFilterChange}
            />
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
          <CardContent>
                      <div>
              <h2 className="text-lg font-semibold mb-4 dark:text-white mt-4">
                All Calls
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {filteredCalls.length} calls
                {filter !== "all" && ` (filtered by ${filter})`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <CallsTable calls={filteredCalls} onView={handleViewCall} />
                      </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CallManagement;
