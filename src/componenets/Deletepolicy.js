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

const DeletePolicy = ({ token }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [policyHolder, setPolicyHolder] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPolicyHolder(null);

    try {
      const response = await axios.delete(
        `https://securing-and-documenting-the-api.onrender.com/api/policyholder/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPolicyHolder(response.data); // Assuming the API returns data upon successful deletion
    } catch (err) {
      setError("Error Deleting policy: " + err.message);
    }
  };
  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete Policyholder
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
        Delete Policy
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {policyHolder && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Policyholder Deleted
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${name}`} />
              {/* Add more fields as needed */}
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
