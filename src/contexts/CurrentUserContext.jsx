import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const SetLoginCountContext = createContext(); // New context for login count

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useSetLoginCount = () => useContext(SetLoginCountContext); // Hook for login count

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [loginCount, setLoginCount] = useState(() => {
    // Retrieve login count from localStorage on component mount
    const storedLoginCount = localStorage.getItem("loginCount");
    return storedLoginCount ? parseInt(storedLoginCount, 10) : 0;
  });

  const history = useHistory();
  const { id } = useParams();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      setLoginCount((prevCount) => {
        // Increment login count
        const newCount = prevCount + 1;
        // Reset login count to 0 for new users
        if (!data) {
          console.log("data count", data)
          return 0;
        }
        return newCount;
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        if (currentUser) { // Check if currentUser exists
          // Fetch profile data using the ID from the URL
          const profileResponse = await axiosRes.get(
            `/profiles/${currentUser.profile_id}/`
          );
          const profileData = profileResponse.data;
  
          console.log("Fetched profile data:", profileData);
  
          // Check if profile data indicates signup is not completed
          if (!profileData.is_signup_completed) {
            console.log("Signup not completed. Redirecting...");
            // Redirect to profile form if signup is not completed
            history.push(`/profiles/${currentUser.profile_id}/`);
            setIsSignupCompleted(false);
            console.log("Is signup completed?", isSignupCompleted);
          } else {
            console.log(
              "Signup completed. Setting current user. Redirecting home."
            );
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
      console.log("Is signup completed?", isSignupCompleted);
      history.push(`/`);
    }
  }, [isSignupCompleted, history]);

  useEffect(() => {
    // Redirect to profile edit form if user is logged in and isSignupCompleted = false
    if (loginCount < 1 && currentUser && !isSignupCompleted && !redirected) {
      history.push(`/signupform/${currentUser.profile_id}/`);
      setRedirected(true); // Set redirected to true to prevent subsequent redirects
      console.log("push");
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
