"use client";

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useState } from "react";
import SuccessDialog from "./SuccessDialog";

interface SetPasswordProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleSetPassword: (onSuccess: () => void) => void;
  error?: string;
  handleSuccessClose: () => void;
}

const SetPassword = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  handleSetPassword,
  error,
  handleSuccessClose,
}: SetPasswordProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDialogClose = () => {
    setShowSuccess(false);
    handleSuccessClose();
  };

  const handleSetPasswordClick = () => {
    handleSetPassword(() => {
      setShowSuccess(true);
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Set Initial Password
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Show error message */}
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSetPasswordClick}
            sx={{ marginTop: 2 }}
          >
            Set Password
          </Button>
        </Box>

        {/* Success Dialog */}
        <SuccessDialog open={showSuccess} onClose={handleDialogClose} />
      </Paper>
    </Container>
  );
};

export default SetPassword;
