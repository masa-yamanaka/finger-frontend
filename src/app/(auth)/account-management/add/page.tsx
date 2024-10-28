import React from "react";
import AddAccountForm from "@/features/account-management/AddAccountForm";
import { Container, Typography } from "@mui/material";

const AccountManagementAdd = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 6, textAlign: "center" }}>
        アカウント新規登録画面
      </Typography>
      <AddAccountForm />
    </Container>
  );
};

export default AccountManagementAdd;
