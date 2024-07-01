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
      setError("Error fetching policy: " + err.message);
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
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        View Policy
      </Button>
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleDashboardRedirect}
        sx={{ mt: 2 }}>
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default ViewPolicy;
