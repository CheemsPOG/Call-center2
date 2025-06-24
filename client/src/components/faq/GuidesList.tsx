import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * GuidesList renders a list of guides as cards or links.
 * Props: guides (array of { title, description, link })
 */
const GuidesList = ({
  guides,
}: {
  guides: { title: string; description: string; link: string }[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {guides.map((guide, idx) => (
      <a href={guide.link} key={idx} target="_blank" rel="noopener noreferrer">
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white text-base">
              {guide.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {guide.description}
            </div>
          </CardContent>
        </Card>
      </a>
    ))}
  </div>
);

export default GuidesList;
