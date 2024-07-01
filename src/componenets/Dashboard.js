import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const options = [
  { title: "View All Policy Holders", path: "/all-policy-holders" },
  { title: "Take/Add/Delete a Policy", path: "/manage-policy" },
  { title: "View Your Policies", path: "/your-policies" },
  { title: "Apply for Claim", path: "/apply-claim" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
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
