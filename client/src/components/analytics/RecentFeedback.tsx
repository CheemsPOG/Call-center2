import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

/**
 * RecentFeedback renders the recent customer feedback card.
 * Props:
 *   - feedback: Array<{ id: number; customer: string; time: string; rating: number; comment: string }>
 */
const RecentFeedback = ({
  feedback,
}: {
  feedback: {
    id: number;
    customer: string;
    time: string;
    rating: number;
    comment: string;
  }[];
}) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700 mt-6">
    <CardHeader>
      <CardTitle className="dark:text-white">Recent Feedback</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Latest customer feedback for you
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {feedback.map((fb) => (
          <div
            key={fb.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {fb.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium dark:text-white">{fb.customer}</div>
                <div className="text-xs text-gray-400">{fb.time}</div>
              </div>
              <div className="flex items-center mt-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < fb.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm">
                {fb.comment}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Fun stat: show how many 5-star feedbacks the agent received today */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            {feedback.filter((fb) => fb.rating === 5).length} five-star
            feedbacks today
          </span>
        </div>
        {/* See more feedback link */}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          See more feedback
        </a>
      </div>
    </CardContent>
  </Card>
);

export default RecentFeedback;
