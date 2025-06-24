import React from "react";
import { Card } from "@/components/ui/card";

const SummaryCard = ({ icon, value, label }) => (
  <Card className="flex flex-col items-center justify-center py-6">
    {icon}
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-gray-500 text-sm">{label}</div>
  </Card>
);

export default SummaryCard;
