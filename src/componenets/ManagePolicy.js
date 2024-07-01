import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagePolicy = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Policy
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/manage-policy/new")}>
            New Customer
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/manage-policy/existing")}>
            Existing Customer
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagePolicy;
