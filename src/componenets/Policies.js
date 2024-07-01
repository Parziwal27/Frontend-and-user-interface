import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

const Policies = ({ token }) => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(
        "https://securing-and-documenting-the-api.onrender.com/api/policy",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPolicies(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching policies");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography component="h2" variant="h5" gutterBottom>
        Policies
      </Typography>
      <Button variant="contained" onClick={fetchPolicies} sx={{ mb: 2 }}>
        Fetch Policies
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {policies.map((policy) => (
          <ListItem key={policy.name}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <Box sx={{ border: 1, padding: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {policy.name}
                </Typography>
              </Box>
              <Box sx={{ border: 1, padding: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  ${policy.amount}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Policies;
