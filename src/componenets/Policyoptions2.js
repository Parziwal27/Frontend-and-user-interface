import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PolicyOptions = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Policy Options
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/add-policy")}>
            Add Policy
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/view-policy")}>
            View Policy
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/delete-policy")}>
            Delete Policy
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PolicyOptions;
