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

const KnowledgeBase = ({ onLogout }: { onLogout?: () => void }) => {
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

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for articles, guides, scripts..."
            className="pl-12 pr-4 py-3 text-base h-12 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-white">Support Scripts</CardTitle>
              <BookOpen className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access approved scripts for various call scenarios.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-white">Troubleshooting</CardTitle>
              <LifeBuoy className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step guides to resolve common technical issues.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-white">Product FAQs</CardTitle>
              <FileQuestion className="h-6 w-6 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find answers to frequently asked questions about our products.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs Section */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Quick answers to common agent questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="dark:text-gray-200 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Guides Section */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Featured Guides</CardTitle>
              <CardDescription className="dark:text-gray-400">
                In-depth articles and best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guides.map((guide, index) => (
                  <a
                    href={guide.link}
                    key={index}
                    className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <h4 className="font-semibold dark:text-white">
                      {guide.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {guide.description}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;
