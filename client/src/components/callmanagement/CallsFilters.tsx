import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

/**
 * CallsFilters renders the search and filter controls for the calls table.
 * Props: filter values, setters, and clear handler.
 */
const CallsFilters = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  clearAllFilters,
  handleFilterChange,
}) => {
  return (
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
              handleFilterChange(setCategoryFilter, "Technical", checked)
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
  );
};

export default CallsFilters;
