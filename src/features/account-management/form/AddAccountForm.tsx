"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Select, MenuItem, TextField, Button, Box } from "@mui/material";
import {
  mockAccountBusinessNames,
  mockAccountBusinessTypes,
  mockAccountRoles,
} from "@/constants/accounts";
import AccountTable from "../component/AccountTable";

const AddAccountForm = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    businessType: "",
    businessName: "",
    role: "",
    loginId: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Add account data: ", formData);
    router.push("/account-management/add/confirm");
  };

  const handleBack = () => {
    router.push("/account-management/");
  };

  const rows = [
    {
      label: "事業者種類",
      input: (
        <Select
          fullWidth
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            事業者種類を選択
          </MenuItem>
          {mockAccountBusinessTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
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
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            事業者名を選択
          </MenuItem>
          {mockAccountBusinessNames.map((businessName) => (
            <MenuItem key={businessName} value={businessName}>
              {businessName}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: "管理権限",
      input: (
        <Select
          fullWidth
          name="role"
          value={formData.role}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            権限を選択
          </MenuItem>
          {mockAccountRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: "ログインID",
      input: (
        <TextField
          fullWidth
          name="loginId"
          value={formData.loginId}
          onChange={handleChange}
          placeholder="ログインIDを入力"
        />
      ),
    },
    {
      label: "メールアドレス",
      input: (
        <TextField
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="メールアドレスを入力"
        />
      ),
    },
  ];

  return (
    <form>
      <AccountTable rows={rows} />

      <Box sx={{ display: "flex", justifyContent: "center", my: 4, gap: 2 }}>
        <Button onClick={handleBack} variant="contained" color="secondary" size="large">
          戻る
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          入力完了
        </Button>
      </Box>
    </form>
  );
};

export default AddAccountForm;
