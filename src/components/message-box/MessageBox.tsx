"use client";

import { Box, Paper, Typography } from "@mui/material";

interface MessageBoxProps {
  title?: string;
  message?: string;
}

export default function MessageBox({ title, message }: MessageBoxProps) {
  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        {title && <Typography variant="h6">{title}</Typography>}
        {message && <Typography variant="body1">{message}</Typography>}
      </Paper>
    </Box>
  );
}
