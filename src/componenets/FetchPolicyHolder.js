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

const FetchPolicyHolder = ({ token }) => {
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
            Accept: "application/json",
          },
        }
      );
      setPolicyHolder(response.data);
    } catch (err) {
      setError("Error fetching policyholder: " + err.message);
    }
  };

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Fetch Policy Holder
      </Typography>
      <TextField
        fullWidth
        label="Policyholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained">
          Fetch Policy Holder
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDashboardRedirect}>
          Back to Dashboard
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {policyHolder && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Policy Holder Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${policyHolder.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Age: ${policyHolder.age}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Policies: ${policyHolder.policies.join(", ")}`}
              />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FetchPolicyHolder;
