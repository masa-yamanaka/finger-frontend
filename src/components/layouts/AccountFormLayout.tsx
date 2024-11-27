"use client";
import { Container, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface AccountFormLayoutProps {
  children: ReactNode;
  title: string;
}

const AccountFormLayout = ({ children, title }: AccountFormLayoutProps) => {
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ my: 4, textAlign: "center" }}>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default AccountFormLayout;
