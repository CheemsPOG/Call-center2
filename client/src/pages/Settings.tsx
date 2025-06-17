import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings as SettingsIcon,
  Phone,
  Users,
  Clock,
  Bell,
  Shield,
  Database,
  User,
  Camera,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const Settings = ({ onLogout }: { onLogout?: () => void }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);

      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Here you would typically upload the file to your server
      // const formData = new FormData();
      // formData.append('profileImage', file);
      // await fetch('/api/upload-profile-image', {
      //   method: 'POST',
      //   body: formData,
      // });

      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to upload profile picture");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage);
      setProfileImage(null);
      toast.success("Profile picture removed");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your call center system preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="call-routing">Call Routing</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    Profile Settings
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Manage your profile information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt="Profile" />
                        ) : (
                          <AvatarFallback className="text-2xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium dark:text-white">
                        Profile Picture
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload a new profile picture. Recommended size:
                        400x400px
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={triggerFileInput}
                          disabled={isUploading}
                        >
                          {isUploading ? "Uploading..." : "Upload New"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={handleRemoveImage}
                          disabled={!profileImage || isUploading}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="first-name"
                        className="dark:text-gray-300"
                      >
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        defaultValue="John"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="dark:text-gray-300">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        defaultValue="Doe"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="dark:text-gray-300">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      className="dark:bg-gray-700 dark:border-gray-600"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    General Settings
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Basic call center configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="center-name"
                        className="dark:text-gray-300"
                      >
                        Call Center Name
                      </Label>
                      <Input
                        id="center-name"
                        defaultValue="Customer Support Center"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="dark:text-gray-300">
                        Timezone
                      </Label>
                      <Select>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">
                            Eastern Standard Time
                          </SelectItem>
                          <SelectItem value="pst">
                            Pacific Standard Time
                          </SelectItem>
                          <SelectItem value="cst">
                            Central Standard Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="business-hours"
                      className="dark:text-gray-300"
                    >
                      Business Hours
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="9:00 AM"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Input
                        placeholder="5:00 PM"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-gray-300">
                        Auto-answer calls
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically answer incoming calls after 3 rings
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    Service Level Targets
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Set performance targets for your team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="dark:text-gray-300">
                        Answer within (seconds)
                      </Label>
                      <Input
                        defaultValue="30"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="dark:text-gray-300">
                        Service Level Target (%)
                      </Label>
                      <Input
                        defaultValue="90"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="dark:text-gray-300">
                        Max Handle Time (minutes)
                      </Label>
                      <Input
                        defaultValue="8"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="call-routing">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Call Routing Rules
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configure how calls are distributed to agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">Routing Method</Label>
                    <Select>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Select routing method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="least-occupied">
                          Least Occupied
                        </SelectItem>
                        <SelectItem value="skills-based">
                          Skills Based
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">Queue Priority</Label>
                    <div className="space-y-3">
                      {["Support", "Sales", "Technical", "Billing"].map(
                        (queue) => (
                          <div
                            key={queue}
                            className="flex items-center justify-between"
                          >
                            <span className="dark:text-white">{queue}</span>
                            <Select>
                              <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue placeholder="Priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Overflow Settings
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm dark:text-gray-300">
                          Enable call overflow
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm dark:text-gray-300">
                          Overflow after (seconds)
                        </span>
                        <Input
                          className="w-20 dark:bg-gray-700 dark:border-gray-600"
                          defaultValue="120"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Agent Configuration
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage agent settings and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Default Agent Status
                    </Label>
                    <Select>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Select default status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">
                      Agent Permissions
                    </Label>
                    {[
                      "Can transfer calls",
                      "Can access customer history",
                      "Can create tickets",
                      "Can modify customer information",
                      "Can access recordings",
                    ].map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm dark:text-gray-300">
                          {permission}
                        </span>
                        <Switch />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Break Time Limits
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          Max break duration (minutes)
                        </Label>
                        <Input
                          defaultValue="15"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          Breaks per shift
                        </Label>
                        <Input
                          defaultValue="3"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Notification Settings
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configure alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">
                      Email Notifications
                    </Label>
                    {[
                      "New ticket created",
                      "High priority calls",
                      "Queue overflow alerts",
                      "Agent performance reports",
                      "System maintenance updates",
                    ].map((notification) => (
                      <div
                        key={notification}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm dark:text-gray-300">
                          {notification}
                        </span>
                        <Switch />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">
                      Real-time Alerts
                    </Label>
                    {[
                      "Call queue threshold exceeded",
                      "Agent status changes",
                      "Customer satisfaction scores",
                      "System errors",
                    ].map((alert) => (
                      <div
                        key={alert}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm dark:text-gray-300">
                          {alert}
                        </span>
                        <Switch />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Alert Recipients
                    </Label>
                    <Textarea
                      placeholder="Enter email addresses separated by commas"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Security Settings
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage security and compliance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">Authentication</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-300">
                        Require two-factor authentication
                      </span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-300">
                        Auto-logout after inactivity
                      </span>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      defaultValue="30"
                      className="w-32 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">
                      Recording & Compliance
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-300">
                        Record all calls
                      </span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-300">
                        PCI compliance mode
                      </span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-300">
                        GDPR compliance
                      </span>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      Data Retention (days)
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          Call recordings
                        </Label>
                        <Input
                          defaultValue="90"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          Customer data
                        </Label>
                        <Input
                          defaultValue="365"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  System Integrations
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Connect with external systems and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Database className="h-5 w-5 text-blue-500" />
                        <span className="font-medium dark:text-white">
                          CRM Integration
                        </span>
                      </div>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Connect with Salesforce, HubSpot, or other CRM systems
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-green-500" />
                        <span className="font-medium dark:text-white">
                          VoIP Provider
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Set up connection to your VoIP service provider
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium dark:text-white">
                          Slack Notifications
                        </span>
                      </div>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Send alerts and updates to Slack channels
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="dark:text-gray-300">
                      API Configuration
                    </Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          Webhook URL
                        </Label>
                        <Input
                          placeholder="https://your-api.com/webhook"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm dark:text-gray-400">
                          API Key
                        </Label>
                        <Input
                          type="password"
                          placeholder="Enter your API key"
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
