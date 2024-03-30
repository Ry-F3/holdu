import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

// Create a ProfileContext
const ProfileContext = createContext();
const SetProfileContext = createContext();

// Custom hook to consume the ProfileContext
export const useProfileData = () => useContext(ProfileContext);
export const useSetProfileData = () => useContext(SetProfileContext); // Custom hook for setting profile data


export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch current user data
        const { data } = await axios.get('/dj-rest-auth/user/');
        setCurrentUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user data:', error);
        setLoading(false);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        try {
          // Fetch profile data using the current user's profile ID
          const { data } = await axios.get(`/profiles/${currentUser.profile_id}/`);
          setProfileData(data);
          console.log('Profile Data Context:', data); // Log profile data here
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    // Call the fetchProfileData function if currentUser exists
    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]); // Make sure to include currentUser as a dependency

  if (loading) {
    // Optionally, you can render a loading indicator while fetching data
    return <Spinner/>;
  }

  return (
    <ProfileContext.Provider value={profileData}>
      <SetProfileContext.Provider value={setProfileData}> {/* Provide the setProfileData function */}
        {children}
      </SetProfileContext.Provider>
    </ProfileContext.Provider>
  );
};