import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "./CurrentUserContext";

// Create a ProfileContext
const ProfileContext = createContext(null); // Set initial value to null
const SetProfileContext = createContext(null);

// Custom hook to consume the ProfileContext
export const useProfileData = () => useContext(ProfileContext);
export const useSetProfileData = () => useContext(SetProfileContext); // Custom hook for setting profile data

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        try {
          // Fetch profile data using the current user's profile ID
          const { data } = await axios.get(
            `/profiles/${currentUser.profile_id}/`
          );
          setProfileData(data);
          
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    // Call the fetchProfileData function if currentUser exists
    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  return (
    <ProfileContext.Provider value={profileData}>
      <SetProfileContext.Provider value={setProfileData}>
        {children}
      </SetProfileContext.Provider>
    </ProfileContext.Provider>
  );
};
