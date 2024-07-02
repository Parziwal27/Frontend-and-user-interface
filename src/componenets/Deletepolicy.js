import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const DeletePolicy = ({ token }) => {
  const [choice, setChoice] = useState("");
  const [name, setName] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      let response;
      if (choice === "policyholder") {
        response = await axios.delete(
          `https://securing-and-documenting-the-api.onrender.com/api/policyholder/${name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (choice === "policy") {
        response = await axios.delete(
          "https://securing-and-documenting-the-api.onrender.com/api/delete_policy",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: {
              name,
              policy_name: policyName,
            },
          }
        );
      }
      setMessage(response.data.message);
    } catch (err) {
      setError("Error Deleting: " + err.message);
    }
  };

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete Options
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Choose an option</FormLabel>
        <RadioGroup
          aria-label="delete choice"
          name="delete-choice"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}>
          <FormControlLabel
            value="policyholder"
            control={<Radio />}
            label="Delete Policyholder"
          />
          <FormControlLabel
            value="policy"
            control={<Radio />}
            label="Delete Specific Policy"
          />
        </RadioGroup>
      </FormControl>
      {choice && (
        <>
          <TextField
            fullWidth
            label="Policyholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          {choice === "policy" && (
            <TextField
              fullWidth
              label="Policy Name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              margin="normal"
              required
            />
          )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {choice === "policyholder"
              ? "Delete Policyholder"
              : "Delete Policy"}
          </Button>
        </>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {message && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${name}`} />
              {choice === "policy" && (
                <ListItemText primary={`Policy: ${policyName}`} />
              )}
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDashboardRedirect}
            sx={{ mt: 2 }}>
            Back to Dashboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DeletePolicy;
