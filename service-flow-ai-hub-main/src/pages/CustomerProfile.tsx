
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Clock,
  Ticket,
  PhoneCall,
  MessageSquare,
  FileText,
  Edit,
  Plus,
} from "lucide-react";

const CustomerProfile = () => {
  const { id } = useParams();
  
  const customer = {
    id: "CUST-001",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 901-2345",
    address: "123 Main St, New York, NY 10001",
    joinDate: "2023-03-15",
    tier: "Premium",
    satisfaction: 4.8,
    totalCalls: 24,
    totalTickets: 8,
    lastContact: "2024-01-15",
    preferredChannel: "Phone",
    timezone: "EST",
    language: "English",
  };

  const callHistory = [
    {
      id: "CALL-001",
      date: "2024-01-15 09:15:00",
      duration: "15:32",
      agent: "John Doe",
      type: "Inbound",
      category: "Support",
      status: "Resolved",
      subject: "Account access issues",
      resolution: "Password reset completed successfully",
      satisfaction: 5,
    },
    {
      id: "CALL-015",
      date: "2024-01-10 14:22:00",
      duration: "8:45",
      agent: "Jane Smith",
      type: "Outbound",
      category: "Follow-up",
      status: "Completed",
      subject: "Service upgrade confirmation",
      resolution: "Customer confirmed upgrade to premium plan",
      satisfaction: 4,
    },
    {
      id: "CALL-008",
      date: "2024-01-05 11:30:00",
      duration: "12:18",
      agent: "Mike Wilson",
      type: "Inbound",
      category: "Technical",
      status: "Resolved",
      subject: "Software installation help",
      resolution: "Guided customer through installation process",
      satisfaction: 5,
    },
  ];

  const ticketHistory = [
    {
      id: "TKT-001",
      title: "Account access issues - Password reset failed",
      status: "Resolved",
      priority: "High",
      created: "2024-01-15 09:15:00",
      resolved: "2024-01-15 09:45:00",
      agent: "John Doe",
      category: "Account Access",
    },
    {
      id: "TKT-012",
      title: "Billing inquiry - Premium plan features",
      status: "Resolved",
      priority: "Medium",
      created: "2024-01-10 14:22:00",
      resolved: "2024-01-10 14:30:00",
      agent: "Jane Smith",
      category: "Billing",
    },
  ];

  const notes = [
    {
      id: 1,
      date: "2024-01-15 09:45:00",
      agent: "John Doe",
      note: "Customer was very patient during password reset process. Appreciated the quick resolution.",
      type: "General",
    },
    {
      id: 2,
      date: "2024-01-10 14:30:00",
      agent: "Jane Smith",
      note: "Customer interested in additional premium features. Good upsell opportunity.",
      type: "Sales",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Customer Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {customer.name}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-purple-100 text-purple-800">
                  {customer.tier}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm dark:text-gray-300">
                    {customer.satisfaction} satisfaction
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Customer since {customer.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Call Customer
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {customer.totalCalls}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Calls
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {customer.totalTickets}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Tickets
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                <Star className="h-6 w-6 mr-1" />
                {customer.satisfaction}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Rating
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {customer.lastContact}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last Contact
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Details Tabs */}
        <Tabs defaultValue="calls" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calls">Call History</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
          </TabsList>

          <TabsContent value="calls">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Call History</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Complete interaction history with this customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {callHistory.map((call) => (
                    <div key={call.id} className="border rounded-lg p-4 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <PhoneCall className="h-4 w-4 text-blue-500" />
                            <span className="font-medium dark:text-white">{call.id}</span>
                            <Badge variant="outline">{call.type}</Badge>
                            <Badge variant="outline">{call.category}</Badge>
                          </div>
                          <h3 className="font-medium mt-1 dark:text-white">{call.subject}</h3>
                        </div>
                        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                          <div>{call.date}</div>
                          <div>Duration: {call.duration}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Agent: </span>
                          <span className="dark:text-white">{call.agent}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Status: </span>
                          <Badge className="bg-green-100 text-green-800">{call.status}</Badge>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-600 dark:text-gray-400">Resolution: </span>
                          <span className="dark:text-white">{call.resolution}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">Rating: </span>
                          <div className="flex items-center">
                            {[...Array(call.satisfaction)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Support Tickets</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  All support tickets created for this customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketHistory.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Ticket className="h-4 w-4 text-orange-500" />
                            <span className="font-medium dark:text-white">{ticket.id}</span>
                            <Badge className="bg-green-100 text-green-800">{ticket.status}</Badge>
                          </div>
                          <h3 className="font-medium mt-1 dark:text-white">{ticket.title}</h3>
                        </div>
                        <Badge className="bg-red-100 text-red-800">{ticket.priority}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Created: </span>
                          <span className="dark:text-white">{ticket.created}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Resolved: </span>
                          <span className="dark:text-white">{ticket.resolved}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Agent: </span>
                          <span className="dark:text-white">{ticket.agent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="dark:text-white">Customer Notes</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Internal notes and observations
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-medium dark:text-white">{note.agent}</span>
                          <Badge variant="outline" className="text-xs">{note.type}</Badge>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{note.date}</span>
                      </div>
                      <p className="text-sm dark:text-gray-300">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Profile Details</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Customer information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Full Name
                      </label>
                      <p className="dark:text-white">{customer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Email Address
                      </label>
                      <p className="dark:text-white">{customer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Phone Number
                      </label>
                      <p className="dark:text-white">{customer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Address
                      </label>
                      <p className="dark:text-white">{customer.address}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Customer Tier
                      </label>
                      <p className="dark:text-white">{customer.tier}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Preferred Channel
                      </label>
                      <p className="dark:text-white">{customer.preferredChannel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Timezone
                      </label>
                      <p className="dark:text-white">{customer.timezone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Language
                      </label>
                      <p className="dark:text-white">{customer.language}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
