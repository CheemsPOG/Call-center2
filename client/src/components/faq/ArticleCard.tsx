import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, FileQuestion, LifeBuoy } from "lucide-react";
import { format, parseISO } from "date-fns";

/**
 * ArticleCard renders a single knowledge base article card.
 * Props: article (object)
 */
const ArticleCard = ({
  article,
}: {
  article: {
    id: number;
    title: string;
    type: string;
    product: string;
    tags: string[];
    lastUpdated: string;
    content: string;
  };
}) => (
  <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="dark:text-white flex items-center gap-2">
        {/* Visual cue for content type */}
        {article.type === "Script" && (
          <BookOpen className="w-5 h-5 text-blue-500" />
        )}
        {article.type === "FAQ" && (
          <FileQuestion className="w-5 h-5 text-yellow-500" />
        )}
        {article.type === "Guide" && (
          <BookOpen className="w-5 h-5 text-green-500" />
        )}
        {article.type === "Troubleshooting Step" && (
          <LifeBuoy className="w-5 h-5 text-red-500" />
        )}
        {article.type === "Policy" && (
          <BookOpen className="w-5 h-5 text-purple-500" />
        )}
        {article.title}
      </CardTitle>
      <span className="text-xs text-gray-400">{article.product}</span>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-700 border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Last updated:{" "}
        <span className="font-medium">
          {format(parseISO(article.lastUpdated), "MMM d, yyyy")}
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-200 text-base">
        {article.content}
      </div>
    </CardContent>
  </Card>
);

export default ArticleCard;
