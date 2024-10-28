import React from "react";
import AddAccountFormConfirm from "@/features/account-management/AddAccountFormConfirm";
import { Container, Typography } from "@mui/material";

const AccountManagementAdd = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 6, textAlign: "center" }}>
        アカウント情報確認画面
      </Typography>
      <AddAccountFormConfirm />
    </Container>
  );
};

export default AccountManagementAdd;
