"use client";

import { Container, Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";

interface LoginProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
  error?: string;
}

const Login = ({ username, password, setUsername, setPassword, handleLogin, error }: LoginProps) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          全曲報告サービスログイン
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="ID"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="パスワード"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show error message */}
          {error && <Alert severity="error">{error}</Alert>}

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            ※ パスワードを忘れた方は管理者にご連絡ください。
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
            ログイン
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
