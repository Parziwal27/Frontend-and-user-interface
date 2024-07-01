import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://securing-and-documenting-the-api.onrender.com/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const token = response.data.access_token;
      onLoginSuccess(token);
      setError(null);
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default Login;