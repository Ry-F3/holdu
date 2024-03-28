import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();
  const { id } = useParams();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data using the ID from the URL
        const profileResponse = await axiosRes.get(`/profiles/${currentUser.profile_id}/`);
        const profileData = profileResponse.data;

        console.log("Fetched profile data:", profileData);
        
        // Check if profile data indicates signup is not completed
        if (!profileData.is_signup_completed) {
          console.log("Signup not completed. Redirecting...");
          // Redirect to profile form if signup is not completed
          history.push(`/profiles/${currentUser.profile_id}`);
        } else {
          console.log("Signup completed. Setting current user. Redirect home.")
          history.push(`/`);
        }
      } catch (err) {
        console.log("Error fetching profile data:", err);
      } 
    };

    fetchData();
  }, [id, history, currentUser]);

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
      {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};