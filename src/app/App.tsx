import React, { useState } from "react"; // imports the React library, which is necessary to use React components and JSX.
import "../css/App.css";
import "../css/navbar.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPagePage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";

function App() {
  // React functional component
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome setPath={setPath} />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant setPath={setPath} />
      ) : (
        <NavbarOthers setPath={setPath} />
      )}
      {/* <nav>
              <ul>
                <li>
                  <Link to="/restaurant">RestaurantPage</Link>
                </li>
                <li>
                  <Link to="/community">CommunityPage</Link>
                </li>
                <li>
                  <Link to="/orders">OrdersPage</Link>
                </li>
                <li>
                  <Link to="/member-page">MemberPage</Link>
                </li>
                <li>
                  <Link to="/help">HelpPage</Link>
                </li>
                <li>
                  <Link to="/login">LoginPage</Link>
                </li>
                <li>
                  <Link to="/">Homepage</Link>
                </li>
              </ul>
            </nav> */}

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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// Functional components are the simplest way to create presentational components that do not require state or lifecycle methods.
