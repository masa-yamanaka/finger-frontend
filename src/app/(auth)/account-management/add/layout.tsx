"use client";
import { Container, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface AccountManagementAddLayoutProps {
  children: ReactNode;
  title: string;
}

const AccountManagementAddLayout = ({
  children,
  title,
}: AccountManagementAddLayoutProps) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default AccountManagementAddLayout;
