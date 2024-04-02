import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const SetLoginCountContext = createContext(); // context for login count
export const useSetLoginCount = () => useContext(SetLoginCountContext); // Hook for login count

// Create a ProfileContext
const ProfileContext = createContext();
// const SetProfileContext = createContext();

// Custom hook to consume the ProfileContext
export const useProfileData = () => useContext(ProfileContext);


export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);
  const [redirected, setRedirected] = useState(false);

  // Prevent users from being posted to ProfileTypeForm Page when 'is_signup_completed'
  const [loginCount, setLoginCount] = useState(() => {
    // Retrieve login count from localStorage on component mount
    const storedLoginCount = localStorage.getItem("loginCount");
    return storedLoginCount ? parseInt(storedLoginCount, 10) : 0;
  });

  const history = useHistory();
  const { id } = useParams();

  const handleMount = async () => {
    try {
      const { data: userData } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(userData);

      const profileId = userData.profile_id;

      // Set profile data using profileId
      const profileResponse = await axiosRes.get(`/profiles/${profileId}/`);
      const profileData = profileResponse.data;
      console.log("Profile data:", profileData);

      // Check if user data is available and if the signup is completed
      if (profileData && profileData.is_signup_completed) {
        console.log("Incrementing login count");
        setLoginCount((prevCount) => prevCount + 1);
      } else {
        console.log("Resetting login count to 0 for new or incomplete users");
        setLoginCount(0);
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    console.log("Current login count:", loginCount); // Log the current login count
    // Store login count in localStorage
    localStorage.setItem("loginCount", loginCount);
  }, [loginCount]); // Log whenever login count changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          // Check if currentUser exists
          // Fetch profile data using the ID from the URL
          const profileResponse = await axiosRes.get(
            `/profiles/${currentUser.profile_id}/`
          );
          const profileData = profileResponse.data;
          // console.log(profileData)

          // Check if profile data indicates signup is not completed
          if (!profileData.is_signup_completed) {
            // Redirect to profile form if signup is not completed
            history.push(`/profiles/${currentUser.profile_id}/`);
            setIsSignupCompleted(false);
            console.log("Is signup completed?", isSignupCompleted);
          } else {
            setIsSignupCompleted(true);
            history.push(`/`);
          }
        }
      } catch (err) {
        console.log("Error fetching profile data:", err);
      }
    };

    if (loginCount < 1 && !isSignupCompleted) {
      fetchData();
    }
  }, [id, history, currentUser, isSignupCompleted, loginCount]);

  // Post home if signup is completed i.e when user has completed ProfileTypeChoiceForm
  useEffect(() => {
    if (isSignupCompleted) {
      history.push(`/`);
    }
  }, [isSignupCompleted, history]);

  useEffect(() => {
    // Redirect to profile edit form if user is logged in and isSignupCompleted = false
    if (loginCount < 1 && currentUser && !isSignupCompleted && !redirected) {
      history.push(`/signupform/${currentUser.profile_id}/`);
      setRedirected(true); // Set redirected to true to prevent subsequent redirects
    }
  }, [currentUser, isSignupCompleted, redirected, history, loginCount]);

  // Reset redirected state if currentUser changes
  useEffect(() => {
    setRedirected(false);
  }, [currentUser]);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <SetLoginCountContext.Provider value={setLoginCount}>
          {children}
        </SetLoginCountContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
