import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Pause,
  Download,
  MessageSquare,
  User,
  MapPin,
  Mail,
  FileText,
  Zap,
} from "lucide-react";
import { calls } from "@/lib/mockData";

const CallDetails = ({ onLogout }: { onLogout?: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const callData = location.state?.call || calls.find((c) => c.id === id);

  useEffect(() => {
    if (!callData) {
      navigate("/calls", { replace: true });
    }
  }, [callData, navigate]);

  if (!callData) {
    return null; // Render nothing while redirecting
  }

  // This can be made dynamic later
  const aiSummary = {
    sentiment: "Neutral",
    keyTopics: ["Password Reset", "Account Access", "Email Issues"],
    urgency: "Medium",
    nextSteps: [
      "Follow up on password reset email",
      "Verify account access",
      "Schedule follow-up call if needed",
    ],
    confidence: 87,
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/calls")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calls
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Call Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Call ID: {callData.id}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {callData.status === "active" && (
              <Button className="bg-red-600 hover:bg-red-700">
                <PhoneOff className="h-4 w-4 mr-2" />
                End Call
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-white">Call Status</CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                    {callData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {callData.duration}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Duration
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {callData.type}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Type
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {callData.category}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Category
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {callData.priority.charAt(0).toUpperCase() +
                        callData.priority.slice(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Priority
                    </div>
                  </div>
                </div>
                <Separator className="my-4 dark:bg-gray-700" />
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <VolumeX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Record
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  AI-Powered Call Analysis
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Real-time insights generated by AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-300">
                      Sentiment
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      {aiSummary.sentiment}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/50 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-300">
                      Urgency
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {aiSummary.urgency}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="font-semibold text-purple-800 dark:text-purple-300">
                      Confidence
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      {aiSummary.confidence}%
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">
                    Key Topics Detected:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aiSummary.keyTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="dark:bg-gray-700 dark:text-gray-300"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">
                    Suggested Next Steps:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {aiSummary.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Call Timeline</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Chronological events during this call
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {callData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium dark:text-white">
                            {event.event}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div
                      className="font-semibold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() =>
                        navigate(`/customers/${callData.customerId}`)
                      }
                    >
                      {callData.customer}
                    </div>
                    <div className="text-sm text-gray-500">
                      Premium Customer
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{callData.customerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{callData.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{callData.customerLocation}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Previous Interactions</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      Last call: {callData.previousInteractions.lastCall}
                    </div>
                    <div>
                      Total calls: {callData.previousInteractions.totalCalls}
                    </div>
                    <div>
                      Avg satisfaction:{" "}
                      {callData.previousInteractions.avgSatisfaction}/5
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                  variant="outline"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
                <Button
                  className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button
                  className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                  variant="outline"
                >
                  <User className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Call Notes</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Add or edit notes about this call
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your notes here..."
                  defaultValue={callData.notes}
                  className="min-h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
                <div className="flex justify-end mt-4">
                  <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CallDetails;
