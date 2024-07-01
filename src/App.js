import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./componenets/Login.js";
import Register from "./componenets/Register.js";
import Dashboard from "./componenets/Dashboard.js";
import ViewAllPolicyHolders from "./componenets/ViewAllPolicyHolders.js";
import ManagePolicy from "./componenets/ManagePolicy.js";
import PolicyOptions1 from "./componenets/PolicyOptions1.js";
import PolicyOptions2 from "./componenets/Policyoptions2.js";
import AddPolicy from "./componenets/AddPolicy.js";
import ViewPolicy from "./componenets/ViewPolicy.js";
import DeletePolicy from "./componenets/Deletepolicy.js";
import FetchPolicy from "./componenets/FetchPolicyHolder.js";
import SubmitClaim from "./componenets/SubmitClaim.js";
import { Container, Typography, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = (newToken) => {
    setIsLoggedIn(true);
    setToken(newToken);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography component="h1" variant="h4" gutterBottom>
              Insurance Policy Management System
            </Typography>
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : showRegister ? (
                    <>
                      <Register onRegisterSuccess={handleRegisterSuccess} />
                      <Button onClick={() => setShowRegister(false)}>
                        Already have an account? Login
                      </Button>
                    </>
                  ) : (
                    <>
                      <Login onLoginSuccess={handleLoginSuccess} />
                      <Button onClick={() => setShowRegister(true)}>
                        Don't have an account? Register
                      </Button>
                    </>
                  )
                }
              />
              <Route
                path="/login"
                element={isLoggedIn ? <Login /> : <Navigate to="/" replace />}
              />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/all-policy-holders"
                element={
                  isLoggedIn ? (
                    <ViewAllPolicyHolders token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/manage-policy"
                element={
                  isLoggedIn ? <ManagePolicy /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/manage-policy/new"
                element={
                  isLoggedIn ? <PolicyOptions1 /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/manage-policy/existing"
                element={
                  isLoggedIn ? <PolicyOptions2 /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/add-policy"
                element={
                  isLoggedIn ? (
                    <AddPolicy token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/view-policy"
                element={
                  isLoggedIn ? (
                    <ViewPolicy token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/delete-policy"
                element={
                  isLoggedIn ? (
                    <DeletePolicy token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/your-policies"
                element={
                  isLoggedIn ? (
                    <FetchPolicy token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/apply-claim"
                element={
                  isLoggedIn ? (
                    <SubmitClaim token={token} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              {/* Add other routes as needed */}
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
