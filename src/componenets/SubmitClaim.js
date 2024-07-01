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

const SubmitClaim = ({ token }) => {
  const [name, setName] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [amount, setAmount] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Access the navigate function from react-router-dom

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseMessage(null);

    try {
      const response = await axios.post(
        `https://securing-and-documenting-the-api.onrender.com/api/claim/${name}`,
        {
          policy_name: policyName,
          amount: parseFloat(amount), // Ensure amount is a float
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(response.data);
    } catch (err) {
      setError("Error submitting claim: " + err.message);
    }
  };

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit Claim
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
        label="Policy Name"
        value={policyName}
        onChange={(e) => setPolicyName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Claim Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}>
        Submit Claim
      </Button>
      <Button
        variant="contained"
        onClick={handleDashboardRedirect}
        sx={{ mt: 2 }}>
        Back to Dashboard
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {responseMessage && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Response
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Message: ${responseMessage.message}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Claim ID: ${responseMessage.claim_id}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Status: ${responseMessage.status}`} />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SubmitClaim;
