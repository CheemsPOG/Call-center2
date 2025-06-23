export interface Call {
  id: string;
  customerId: string;
  customer: string;
  customerPhone: string;
  customerEmail: string;
  customerLocation: string;
  agent: string;
  type: "Inbound" | "Outbound";
  category: "Support" | "Sales" | "Technical";
  status: "active" | "completed" | "queued" | "on-hold";
  duration: string;
  startTime: string;
  priority: "high" | "medium" | "low";
  subject: string;
  summary: string;
  notes: string;
  recording: string;
  satisfaction: number;
  resolution: string;
  timeline: {
    time: string;
    event: string;
    description: string;
  }[];
  previousInteractions: {
    lastCall: string;
    totalCalls: number;
    avgSatisfaction: number;
  };
}

export const calls: Call[] = [
  {
    id: "CALL-001",
    customerId: "CUST-001",
    customer: "Alice Johnson",
    customerPhone: "+1 (555) 901-2345",
    customerEmail: "alice.j@example.com",
    customerLocation: "New York, NY",
    agent: "John Doe",
    type: "Inbound",
    category: "Support",
    status: "active",
    duration: "00:15:32",
    startTime: "2024-01-15 09:15:00",
    priority: "high",
    subject: "Account access issues",
    summary:
      "Customer unable to access account due to forgotten password. Assisted with password reset process.",
    notes:
      "Customer was very patient. Previous attempts to reset failed due to email issues. Verified identity through security questions.",
    recording: "available",
    satisfaction: 4.5,
    resolution: "pending",
    timeline: [
      { time: "09:15:00", event: "Call Initiated", description: "Inbound call from customer." },
      { time: "09:15:25", event: "Agent Assigned", description: "Call assigned to John Doe." },
      { time: "09:17:00", event: "Issue Identified", description: "Customer cannot reset password." },
    ],
    previousInteractions: { lastCall: "2 weeks ago", totalCalls: 8, avgSatisfaction: 4.2 },
  },
  {
    id: "CALL-002",
    customerId: "CUST-002",
    customer: "Bob Smith",
    customerPhone: "+1 (555) 234-5678",
    customerEmail: "bob.s@example.com",
    customerLocation: "Chicago, IL",
    agent: "John Doe",
    type: "Outbound",
    category: "Sales",
    status: "completed",
    duration: "00:08:15",
    startTime: "2024-01-15 10:30:00",
    priority: "medium",
    subject: "Product inquiry",
    summary: "Followed up on a product inquiry from the website.",
    notes: "Customer is interested in the premium package. Scheduled a demo for Friday.",
    recording: "available",
    satisfaction: 5,
    resolution: "completed",
    timeline: [
      { time: "10:30:00", event: "Call Initiated", description: "Outbound call to customer." },
      { time: "10:32:10", event: "Discussion", description: "Discussed premium package features." },
      { time: "10:37:00", event: "Action Set", description: "Demo scheduled for Friday." },
    ],
    previousInteractions: { lastCall: "3 months ago", totalCalls: 2, avgSatisfaction: 5.0 },
  },
  {
    id: "CALL-003",
    customerId: "CUST-003",
    customer: "Carol Davis",
    customerPhone: "+1 (555) 345-6789",
    customerEmail: "carol.d@example.com",
    customerLocation: "Los Angeles, CA",
    agent: "John Doe",
    type: "Inbound",
    category: "Technical",
    status: "queued",
    duration: "00:02:10",
    startTime: "2024-01-15 11:45:00",
    priority: "low",
    subject: "Software installation help",
    summary: "Customer needs help installing the new software update.",
    notes: "Customer is using an older operating system. Will need to guide them through manual installation.",
    recording: "not_available",
    satisfaction: 0,
    resolution: "pending",
    timeline: [
        { time: "11:45:00", event: "Call Queued", description: "Customer waiting for an agent." },
    ],
    previousInteractions: { lastCall: "1 year ago", totalCalls: 1, avgSatisfaction: 3.0 },
  },
  {
    id: "CALL-004",
    customerId: "CUST-004",
    customer: "David Brown",
    customerPhone: "+1 (555) 904-5678",
    customerEmail: "david.b@example.com",
    customerLocation: "Houston, TX",
    agent: "John Doe",
    type: "Inbound",
    category: "Technical",
    status: "active",
    duration: "00:25:43",
    startTime: "2024-01-15 09:05:00",
    priority: "high",
    subject: "Technical support request",
    summary: "Customer is experiencing a critical error with the application.",
    notes: "Error code 503. Escalated to tier 2 support.",
    recording: "available",
    satisfaction: 3,
    resolution: "pending",
    timeline: [
        { time: "09:05:00", event: "Call Initiated", description: "High-priority inbound call." },
        { time: "09:05:45", event: "Agent Assigned", description: "Call assigned to John Doe." },
        { time: "09:10:00", event: "Escalated", description: "Escalated to Tier 2 for critical error." },
    ],
    previousInteractions: { lastCall: "1 month ago", totalCalls: 5, avgSatisfaction: 3.8 },
  },
  {
    id: "CALL-005",
    customerId: "CUST-005",
    customer: "Emma Wilson",
    customerPhone: "+1 (555) 905-6789",
    customerEmail: "emma.w@example.com",
    customerLocation: "Phoenix, AZ",
    agent: "John Doe",
    type: "Inbound",
    category: "Support",
    status: "on-hold",
    duration: "00:12:20",
    startTime: "2024-01-15 09:20:00",
    priority: "low",
    subject: "General inquiry",
    summary: "Customer has a general question about their subscription.",
    notes: "Provided information about subscription tiers. Customer is considering an upgrade.",
    recording: "available",
    satisfaction: 4,
    resolution: "pending",
    timeline: [
        { time: "09:20:00", event: "Call Initiated", description: "Inbound call from customer." },
        { time: "09:22:15", event: "Agent Assigned", description: "Call assigned to John Doe." },
        { time: "09:28:00", event: "Put on Hold", description: "Agent fetching subscription details." },
    ],
    previousInteractions: { lastCall: "6 months ago", totalCalls: 3, avgSatisfaction: 4.5 },
  },
]; 