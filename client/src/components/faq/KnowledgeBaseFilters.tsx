import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/**
 * KnowledgeBaseFilters renders the search bar and all filter controls for the knowledge base.
 * Props: search, setSearch, typeFilter, setTypeFilter, productFilter, setProductFilter, tagFilter, setTagFilter, allTags, lastUpdatedFilter, setLastUpdatedFilter
 */
const KnowledgeBaseFilters = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  productFilter,
  setProductFilter,
  tagFilter,
  setTagFilter,
  allTags,
  lastUpdatedFilter,
  setLastUpdatedFilter,
}: {
  search: string;
  setSearch: (s: string) => void;
  typeFilter: string;
  setTypeFilter: (s: string) => void;
  productFilter: string;
  setProductFilter: (s: string) => void;
  tagFilter: string[];
  setTagFilter: (tags: string[]) => void;
  allTags: string[];
  lastUpdatedFilter: string;
  setLastUpdatedFilter: (s: string) => void;
}) => (
  <div className="flex flex-col gap-4">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search for articles, guides, scripts..."
        className="pl-12 pr-4 py-3 text-base h-12 rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="flex flex-wrap gap-4 items-center">
      {/* Content Type Filter */}
      <select
        className="border rounded px-2 py-1"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">All Types</option>
        {["Guide", "FAQ", "Troubleshooting Step", "Policy"].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {/* Product Filter */}
      <select
        className="border rounded px-2 py-1"
        value={productFilter}
        onChange={(e) => setProductFilter(e.target.value)}
      >
        <option value="">All Products</option>
        {[
          "Merchant Payments",
          "KYC/Verification",
          "Card Issuing",
          "API Integration",
          "Security/Fraud",
          "Disputes/Chargebacks",
          "Wallet",
        ].map((prod) => (
          <option key={prod} value={prod}>
            {prod}
          </option>
        ))}
      </select>
      {/* Tags Filter (multi-select) */}
      <div className="flex gap-1 items-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">Tags:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-2 py-1 rounded text-xs border ${
              tagFilter.includes(tag)
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : "bg-gray-50 border-gray-300 text-gray-600"
            }`}
            onClick={() =>
              setTagFilter(
                tagFilter.includes(tag)
                  ? tagFilter.filter((t) => t !== tag)
                  : [...tagFilter, tag]
              )
            }
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Last Updated Filter */}
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Updated After:
        </span>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={lastUpdatedFilter}
          onChange={(e) => setLastUpdatedFilter(e.target.value)}
        />
        {lastUpdatedFilter && (
          <button
            className="ml-1 text-xs text-red-500"
            onClick={() => setLastUpdatedFilter("")}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </div>
);

export default KnowledgeBaseFilters;
