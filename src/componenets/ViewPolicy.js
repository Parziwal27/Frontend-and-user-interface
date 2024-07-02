import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ViewPolicy = ({ token }) => {
  const [name, setName] = useState("");
  const [policyHolder, setPolicyHolder] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPolicyHolder(null);

    try {
      const response = await axios.get(
        `https://securing-and-documenting-the-api.onrender.com/api/policyholder/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPolicyHolder(response.data);
    } catch (err) {
      console.error("View Policy error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred during login");
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("Error setting up the request");
      }
    }
  };

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        View Policy
      </Typography>
      <TextField
        fullWidth
        label="Policyholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          View Policy
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {policyHolder && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Policy Details:</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${policyHolder.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Age: ${policyHolder.age}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Policies:"
                secondary={policyHolder.policies.join(", ")}
              />
            </ListItem>
          </List>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDashboardRedirect}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ViewPolicy;
