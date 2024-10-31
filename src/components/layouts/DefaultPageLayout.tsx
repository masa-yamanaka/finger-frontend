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
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default DefaultPageLayout;
