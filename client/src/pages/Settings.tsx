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
import { useUserProfile } from "@/contexts/UserProfileContext";
import ProfileTab from "@/components/settings/ProfileTab";
import GeneralTab from "@/components/settings/GeneralTab";
import CallRoutingTab from "@/components/settings/CallRoutingTab";
import AgentsTab from "@/components/settings/AgentsTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import SecurityTab from "@/components/settings/SecurityTab";
import IntegrationsTab from "@/components/settings/IntegrationsTab";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = ({ onLogout }: { onLogout?: () => void }) => {
  // Use profile image from context so it syncs with Layout
  const { profileImage, setProfileImage } = useUserProfile();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("profile");

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
      setProfileImage(imageUrl); // Update context so Layout updates too

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
      setProfileImage(null); // Update context so Layout updates too
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

        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          {/* Mobile: Dropdown for tab selection */}
          {isMobile ? (
            <Select value={tab} onValueChange={setTab}>
              <SelectTrigger className="w-full mb-2">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="call-routing">Call Routing</SelectItem>
                <SelectItem value="agents">Agents</SelectItem>
                <SelectItem value="notifications">Notifications</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="integrations">Integrations</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="call-routing">Call Routing</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="profile">
            <ProfileTab
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              triggerFileInput={triggerFileInput}
            />
          </TabsContent>

          <TabsContent value="general">
            <GeneralTab /* pass props as needed */ />
          </TabsContent>

          <TabsContent value="call-routing">
            <CallRoutingTab /* pass props as needed */ />
          </TabsContent>

          <TabsContent value="agents">
            <AgentsTab /* pass props as needed */ />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab /* pass props as needed */ />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab /* pass props as needed */ />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab /* pass props as needed */ />
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
