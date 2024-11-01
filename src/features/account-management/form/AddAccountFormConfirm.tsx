"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Select, MenuItem, TextField } from "@mui/material";
import ReusableTable from "../component/AccountTable";

const ConfirmPage = () => {
  const router = useRouter();

  const [formData] = React.useState({
    businessType: "test",
    businessName: "test",
    role: "test",
    loginId: "test",
    email: "test",
  });

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    console.log("Confirm data: ", formData);
    router.push("/account-management");
  };

  const rows = [
    {
      label: "事業者種類",
      input: (
        <Select
          fullWidth
          name="businessType"
          value={formData.businessType}
          disabled
        >
          <MenuItem key={formData.businessType} value={formData.businessType}>
            {formData.businessType}
          </MenuItem>
        </Select>
      ),
    },
    {
      label: "事業者名",
      input: (
        <Select
          fullWidth
          name="businessName"
          value={formData.businessName}
          disabled
        >
          <MenuItem key={formData.businessName} value={formData.businessName}>
            {formData.businessName}
          </MenuItem>
        </Select>
      ),
    },
    {
      label: "管理権限",
      input: (
        <Select fullWidth name="type" value={formData.role} disabled>
          <MenuItem key={formData.role} value={formData.role}>
            {formData.role}
          </MenuItem>
        </Select>
      ),
    },
    {
      label: "ログインID",
      input: (
        <TextField fullWidth name="loginId" value={formData.loginId} disabled />
      ),
    },
    {
      label: "メールアドレス",
      input: (
        <TextField fullWidth name="email" value={formData.email} disabled />
      ),
    },
  ];

  return (
    <>
      <ReusableTable rows={rows} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, my: 4 }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleBack}
        >
          戻る
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleConfirm}
        >
          確認完了
        </Button>
      </Box>
    </>
  );
};

export default ConfirmPage;
