import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfileTypeChoiceForm from "./pages/profiles/ProfileTypeChoiceForm";
import JobsPostPage from "./pages/jobs/JobsPostPage.jsx";
import JobsCreateForm from "./pages/jobs/JobsCreateForm.jsx";
import JobsHomePage from "./pages/jobs/JobsHomePage.jsx";
import { useCurrentUser } from "./contexts/CurrentUserContext.jsx";
import { useState } from "react";
import BottomNavBar from "./components/BottomNavBar.jsx";
import ConnectionsPage from "./pages/connections/ConnectionsPage.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.id || ""; // Check if profileData is available


  // Handle search for different pages
  const handleSearch = (searchValue) => {
   
    setSearchQuery(searchValue);
  };

  return (
    <div className={styles.App}>
      <NavBar handleSearch={handleSearch} />
      <BottomNavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <JobsHomePage
                searchQuery={searchQuery}
                filter={`employer_profile__owner__username=${profile_id}`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/profiles/:id"
            render={() => <ProfileTypeChoiceForm />}
          />
          <Route exact path="/connect" render={() => <ConnectionsPage/>} />
          <Route exact path="/chats" render={() => <h1>Chats</h1>} />
          <Route
            exact
            path="/jobs/post"
            render={() => <JobsCreateForm searchQuery={searchQuery} />}
          />
          <Route exact path="/jobs/post/:id" render={() => <JobsPostPage />} />
          <Route
            exact
            path="/notifications"
            render={() => <h1>Notifications</h1>}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
  
    </div>
  );
}

export default App;
