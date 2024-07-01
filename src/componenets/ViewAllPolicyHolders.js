import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";

const ViewAllPolicyHolders = ({ token }) => {
  const [policyHolders, setPolicyHolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicyHolders = async () => {
      try {
        const response = await axios.get(
          "https://securing-and-documenting-the-api.onrender.com/api/policyholder",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPolicyHolders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching policy holders");
        setLoading(false);
      }
    };

    fetchPolicyHolders();
  }, [token]);

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        All Policy Holders
      </Typography>
      <List>
        {policyHolders.map((holder, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${holder.name} (Age: ${holder.age})`}
              secondary={`Policies: ${holder.policies.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
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

export default ViewAllPolicyHolders;
