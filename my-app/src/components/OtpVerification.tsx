import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

interface OtpVerificationProps {
  email: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, otp);
      console.log("OTP verification successful");
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Verify OTP
        </Typography>
        <Box component="form" onSubmit={handleVerify} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OtpVerification;
