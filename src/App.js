import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfileTypeChoiceForm from "./pages/profiles/ProfileTypeChoiceForm";


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/profiles/:id"
            render={() => <ProfileTypeChoiceForm />}
          />
          <Route exact path="/connect" render={() => <h1>Connect</h1>} />
          <Route exact path="/chats" render={() => <h1>Chats</h1>} />
          <Route exact path="/jobs" render={() => <h1>Jobs</h1>} />
          <Route exact path="/notifications" render={() => <h1>Notifications</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
