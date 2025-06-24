import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, LifeBuoy, BookOpen, FileQuestion } from "lucide-react";
import { useState } from "react";
import { format, isAfter, parseISO } from "date-fns";
// Import extracted components
import FAQAccordion from "@/components/faq/FAQAccordion";
import GuidesList from "@/components/faq/GuidesList";
import KnowledgeBaseFilters from "@/components/faq/KnowledgeBaseFilters";
import ArticleCard from "@/components/faq/ArticleCard";

// Mock data for the knowledge base
const faqs = [
  {
    question: "How do I reset a customer's password?",
    answer:
      "Navigate to the customer's profile, click on 'Security Settings', and then 'Send Password Reset Link'. The customer will receive an email with instructions.",
  },
  {
    question: "What is the policy for handling refund requests?",
    answer:
      "For refund requests within 30 days of purchase, you can process them directly. For requests after 30 days, escalate the ticket to a Tier 2 support agent.",
  },
  {
    question: "Where can I find the call script for new customer onboarding?",
    answer:
      "The onboarding script is located in the 'Scripts' section under 'Sales'. Make sure you are using the latest version of the script.",
  },
];

const guides = [
  {
    title: "Troubleshooting Common Connection Issues",
    description:
      "A step-by-step guide to help customers with network problems.",
    link: "#",
  },
  {
    title: "Handling High-Priority Tickets",
    description:
      "Best practices for managing and resolving urgent customer issues.",
    link: "#",
  },
  {
    title: "Guide to Using the New CRM Features",
    description:
      "An overview of the latest updates to our customer management system.",
    link: "#",
  },
];

// Mock articles data with advanced fields for an online payment service company
const articles = [
  {
    id: 1,
    title: "How to Issue a Refund",
    type: "Guide",
    product: "Merchant Payments",
    tags: ["refund", "merchant", "transaction"],
    lastUpdated: "2024-06-01",
    content: "Step-by-step guide for issuing refunds to customers...",
  },
  {
    id: 2,
    title: "KYC Verification Script",
    type: "Script",
    product: "KYC/Verification",
    tags: ["kyc", "verification", "compliance"],
    lastUpdated: "2024-05-28",
    content: "Script for guiding customers through KYC verification...",
  },
  {
    id: 3,
    title: "Troubleshooting: Failed Card Payment",
    type: "Troubleshooting Step",
    product: "Card Issuing",
    tags: ["card", "error"],
    lastUpdated: "2024-06-10",
    content: "Checklist for resolving failed card payments...",
  },
  {
    id: 4,
    title: "API Integration FAQ",
    type: "FAQ",
    product: "API Integration",
    tags: ["api", "integration", "developer"],
    lastUpdated: "2024-06-12",
    content: "Frequently asked questions about integrating our API...",
  },
  {
    id: 5,
    title: "Security Policy Update",
    type: "Policy",
    product: "Security/Fraud",
    tags: ["security", "policy", "2fa"],
    lastUpdated: "2024-06-15",
    content: "All users must enable 2FA for account security...",
  },
  {
    id: 6,
    title: "Dispute/Chargeback Handling Guide",
    type: "Guide",
    product: "Disputes/Chargebacks",
    tags: ["dispute", "chargeback", "merchant"],
    lastUpdated: "2024-06-13",
    content: "How to handle disputes and chargebacks efficiently...",
  },
  {
    id: 7,
    title: "Wallet Limits FAQ",
    type: "FAQ",
    product: "Wallet",
    tags: ["limits", "wallet", "policy"],
    lastUpdated: "2024-06-11",
    content: "Frequently asked questions about wallet limits...",
  },
  {
    id: 8,
    title: "Payouts API Troubleshooting",
    type: "Troubleshooting Step",
    product: "Payouts",
    tags: ["payout", "api", "error", "settlement"],
    lastUpdated: "2024-06-09",
    content: "Steps to resolve payout API errors and settlement issues...",
  },
];

// Only use the streamlined tag set for the tag filter
const allowedTags = [
  "refund",
  "merchant",
  "transaction",
  "kyc",
  "verification",
  "compliance",
  "card",
  "error",
  "api",
  "integration",
  "developer",
  "security",
  "policy",
  "2fa",
  "dispute",
  "chargeback",
  "wallet",
  "limits",
  "payout",
  "settlement",
  "onboarding",
];
const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).filter(
  (tag) => allowedTags.includes(tag)
);

const KnowledgeBase = ({ onLogout }: { onLogout?: () => void }) => {
  // Search and filter state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | "">("");
  const [productFilter, setProductFilter] = useState<string | "">("");
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [lastUpdatedFilter, setLastUpdatedFilter] = useState<string>(""); // ISO date string

  // Filtering logic
  const filteredArticles = articles.filter((a) => {
    // Search by title/content/tags
    const searchMatch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    // Type filter
    const typeMatch = !typeFilter || a.type === typeFilter;
    // Product filter
    const productMatch = !productFilter || a.product === productFilter;
    // Tag filter (all selected tags must be present)
    const tagMatch =
      tagFilter.length === 0 || tagFilter.every((t) => a.tags.includes(t));
    // Last updated filter (show articles updated after selected date)
    const lastUpdatedMatch =
      !lastUpdatedFilter ||
      isAfter(parseISO(a.lastUpdated), parseISO(lastUpdatedFilter));
    return (
      searchMatch && typeMatch && productMatch && tagMatch && lastUpdatedMatch
    );
  });

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Knowledge Base
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your central hub for support scripts, FAQs, and troubleshooting
            guides.
          </p>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>

        {/* Guides Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Guides</h2>
          <GuidesList guides={guides} />
        </div>

        {/* Search Bar & Filters */}
        <KnowledgeBaseFilters
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          allTags={allTags}
          lastUpdatedFilter={lastUpdatedFilter}
          setLastUpdatedFilter={setLastUpdatedFilter}
        />

        {/* Filtered Results */}
        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No articles found.
            </div>
          ) : (
            filteredArticles.map((a) => <ArticleCard key={a.id} article={a} />)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;
