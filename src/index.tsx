// React Core and DOM Imports
import React from "react";
import { createRoot } from "react-dom/client";
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

const container = document.getElementById("root")!; //  is used to select the HTML element with the ID of root where your React app will mount.
// where your React app will mount. The ! at the end is a TypeScript non-null assertion operator, indicating that you're sure this element exists.
const root = createRoot(container); // creates a root for React app with the container you've selected.

root.render(
  // is the method that initializes the rendering of App component into the root DOM node.
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// Provider wraps your App component, passing the store as a prop, making
// the Redux store available to any nested components that might need to access the Redux store.
reportWebVitals();
