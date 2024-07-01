import React from "react";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const options = [
  { title: "View All Policy Holders", path: "/all-policy-holders" },
  { title: "Take/Add/Delete a Policy", path: "/manage-policy" },
  { title: "View Your Policies", path: "/your-policies" },
  { title: "Apply for Claim", path: "/apply-claim" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear authentication tokens, reset session)
    // For example, redirecting to login page in a SPA:
    navigate("/");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
          cursor: "pointer",
        }}
        onClick={handleLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <Typography variant="subtitle1" color="inherit" sx={{ ml: 1 }}>
          Logout
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
              onClick={() => navigate(option.path)}>
              <Typography variant="h6">{option.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
