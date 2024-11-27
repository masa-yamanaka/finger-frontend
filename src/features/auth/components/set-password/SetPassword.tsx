"use client";

import { Container, Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";

interface SetPasswordProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleSetPassword: () => void;
  error?: string;
}

const SetPassword = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  handleSetPassword,
  error,
}: SetPasswordProps) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          パスワード変更
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <Typography variant="body1">ID: xxxxxxxxxx@email.com</Typography>
          <TextField
            fullWidth
            label="新規パスワード"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2">※ パスワードのルールを表記</Typography>
          <TextField
            fullWidth
            label="新規パスワード（再入力）"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Show error message */}
          {error && <Alert severity="error">{error}</Alert>}

          <Button fullWidth variant="contained" color="primary" onClick={handleSetPassword} sx={{ marginTop: 2 }}>
            完了
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SetPassword;
