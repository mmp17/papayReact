// React Core and DOM Imports
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
// Redux Imports
import { Provider } from "react-redux"; //to make the Redux store available to the rest of the app.
import { store } from "./app/store";
// Main App Component & CSS
import App from "./app/App"; //main React component for the application
import "./css/index.css";
import reportWebVitals from "./reportWebVitals"; // is a function that can be used to measure the performance of our app (optional and can be used for logging or analytics purposes).
// Material UI Imports
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import { SocketContext, socket } from "./app/context/socket";

ReactDOM.render(
  // is the method from the ReactDOM library, and it is used to render your React application into the HTML document.
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
  // This is the DOM element where your React application will be mounted
);

// Provider wraps your App component, passing the store as a prop, making
// the Redux store available to any nested components that might need to access the Redux store.
reportWebVitals();
