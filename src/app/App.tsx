import React from "react"; // imports the React library, which is necessary to use React components and JSX.
import "../css/App.css";
import { Box, Container, Stack, Typography } from "@mui/material";

function App() {
  // React functional component
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h1"} gutterBottom>
            Create React App on TypeScript with Redux
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;

// Functional components are the simplest way to create presentational components that do not require state or lifecycle methods.
