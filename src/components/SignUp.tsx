import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
          phone_number: phone,
          birthdate: dob?.format("YYYY-MM-DD"),
        },
      });
      console.log("Sign up successful");
      setActiveStep(1);
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, otp);
      console.log("OTP verification successful");
      setActiveStep(2);
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };

  const renderSignUpForm = () => (
    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <DatePicker
        label="Date of Birth"
        value={dob}
        onChange={(newValue) => setDob(newValue)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone Number"
        name="phone"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );

  const renderOtpForm = () => (
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Verify OTP
      </Button>
    </Box>
  );

  const renderSuccess = () => (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography variant="h6">Registration Successful!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        You can now log in with your email and password.
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
        Go to Login
      </Button>
    </Box>
  );

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
          Sign up
        </Typography>
        <Stepper activeStep={activeStep} sx={{ width: "100%", mt: 3 }}>
          <Step>
            <StepLabel>Sign Up</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify OTP</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && renderSignUpForm()}
        {activeStep === 1 && renderOtpForm()}
        {activeStep === 2 && renderSuccess()}
      </Box>
    </Container>
  );
};

export default SignUp;
