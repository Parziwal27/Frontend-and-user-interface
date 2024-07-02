import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UpdatePolicy = ({ token }) => {
  const [name, setName] = useState("");
  const [newPolicy, setNewPolicy] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      const response = await axios.put(
        `https://securing-and-documenting-the-api.onrender.com/api/policyholder/${name}`,
        { policy: newPolicy },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      setName("");
      setNewPolicy("");
    } catch (err) {
      console.error("update policy error:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "An error occurred during update policy"
        );
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("Error setting up the request");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Policy
      </Typography>
      <TextField
        fullWidth
        label="Policyholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="New Policy Name"
        value={newPolicy}
        onChange={(e) => setNewPolicy(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Update Policy
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography color="success" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default UpdatePolicy;
