import { Box } from "@mui/material";

function Dashboard() {
  return (
    <>
      <Box sx={{ margin: "auto", textAlign: "center" }}>
        <h3>Dashboard</h3>
        <h5>
          Welcome, User you have successfully signed in using AWS Cognito
          Authentication.
        </h5>
      </Box>
    </>
  );
}

export default Dashboard;
