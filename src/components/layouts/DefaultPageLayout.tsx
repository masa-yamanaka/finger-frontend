"use client";
import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface DefaultPageLayoutProps {
  children: ReactNode;
  title?: string;
}

const DefaultPageLayout = ({ children, title }: DefaultPageLayoutProps) => {
  return (
    <Box>
      {title && (
        <Typography variant="h4" sx={{ mb: 4 }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default DefaultPageLayout;
