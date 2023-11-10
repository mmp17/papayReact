import React from "react"; // imports the React library, which is necessary to use React components and JSX.
import "../css/App.css";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPagePage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";

function App() {
  // React functional component
  return (
    <Router>
      <div>
        <Router>
          <div>
            <nav>
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
            </nav>

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
          </div>
        </Router>
      </div>
    </Router>
  );
}

export default App;

// Functional components are the simplest way to create presentational components that do not require state or lifecycle methods.
