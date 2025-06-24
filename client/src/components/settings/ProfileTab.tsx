import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera } from "lucide-react";
import React from "react";

interface ProfileTabProps {
  profileImage: string | null;
  setProfileImage: (url: string | null) => void;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  triggerFileInput: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  profileImage,
  setProfileImage,
  isUploading,
  fileInputRef,
  handleImageUpload,
  handleRemoveImage,
  triggerFileInput,
}) => {
  return (
    <div className="grid gap-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Profile Settings</CardTitle>
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
                Upload a new profile picture. Recommended size: 400x400px
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
              <Label htmlFor="first-name" className="dark:text-gray-300">
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
  );
};

export default ProfileTab;
