import React, { useState } from "react"; // imports the React library, which is necessary to use React components and JSX.
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";

import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
import Car from "./screens/RestaurantPage/testCar";
import AuthenticationModal from "./components/auth";
import { SettingsSharp } from "@mui/icons-material";

function App() {
  //** Initializations */
  // React functional component
  const [path, setPath] = useState();
  // const location = useLocation();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  /**  Handlers */
  const handleSignupOpen = () => setSignUpOpen(true);
  const handleSignupClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignupOpen={handleSignupOpen}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant setPath={setPath} handleLoginOpen={handleLoginOpen} />
      ) : (
        <NavbarOthers setPath={setPath} handleLoginOpen={handleLoginOpen} />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
          {/* <Car /> */}
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignupOpen={handleSignupOpen}
        handleSignupClose={handleSignupClose}
      />
    </Router>
  );
}

export default App;

// Functional components are the simplest way to create presentational components that do not require state or lifecycle methods.
