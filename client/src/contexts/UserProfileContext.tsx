import React, { createContext, useContext, useState, ReactNode } from "react";

// Context type
interface UserProfileContextType {
  profileImage: string | null;
  setProfileImage: (url: string | null) => void;
}

// Create context with default values
const UserProfileContext = createContext<UserProfileContextType>({
  profileImage: null,
  setProfileImage: () => {},
});

// Provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  return (
    <UserProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Hook to use the context
export const useUserProfile = () => useContext(UserProfileContext);
