import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const policyOptions = [
  { name: "Life Insurance", amount: 100.0 },
  { name: "House Insurance", amount: 50.0 },
  { name: "Car Insurance", amount: 20.0 },
  { name: "Other Insurance", amount: 10.0 },
];

const AddPolicy = ({ token }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePolicyChange = (policyName) => {
    setSelectedPolicies((prev) =>
      prev.includes(policyName)
        ? prev.filter((p) => p !== policyName)
        : [...prev, policyName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://securing-and-documenting-the-api.onrender.com/api/policyholder",
        {
          name,
          age: parseInt(age),
          policies: selectedPolicies,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setName("");
      setAge("");
      setSelectedPolicies([]);
    } catch (err) {
      console.error("Add policy error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred during login");
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
        Add Policy
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
        required
      />
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Select Policies:
      </Typography>
      <Grid container spacing={2}>
        {policyOptions.map((policy) => (
          <Grid item xs={6} key={policy.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPolicies.includes(policy.name)}
                  onChange={() => handlePolicyChange(policy.name)}
                />
              }
              label={`${policy.name} ($${policy.amount})`}
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Add Policy
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Policy added successfully!
        </Typography>
      )}
    </Box>
  );
};

export default AddPolicy;
