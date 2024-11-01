"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, MenuItem, TextField, Button, Box } from "@mui/material";
import {
  mockAccountBusinessTypes,
  mockAccountBusinessNames,
  mockAccountRoles,
} from "@/constants/accounts";
import AccountTable from "../component/AccountTable";

// Define types for form data
interface FormData {
  name: string;
  kana: string;
  email: string;
  loginId: string;
  businessType: string;
  businessName: string;
  role: string;
}

const EditAccountForm: React.FC = () => {
  const router = useRouter();

  // Add API here to fetch the data
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    kana: "",
    email: "",
    loginId: "",
    businessType: "",
    businessName: "",
    role: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Confirm edit data: ", formData);
    router.push("/account-management/");
  };

  // Define rows for ReusableTable
  const rows = [
    {
      label: "名前",
      input: (
        <TextField
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      ),
    },
    {
      label: "カナちゃん",
      input: (
        <TextField
          fullWidth
          name="kana"
          value={formData.kana}
          onChange={handleChange}
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
        />
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
        />
      ),
    },
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
          {mockAccountBusinessTypes.map((businessType) => (
            <MenuItem key={businessType} value={businessType}>
              {businessType}
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
          inputProps={{ "aria-label": "事業者名を選択" }}
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
  ];

  return (
    <form onSubmit={handleSubmit}>
      <AccountTable rows={rows} />

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <Button type="submit" variant="contained" color="primary" size="large">
          確定
        </Button>
      </Box>
    </form>
  );
};

export default EditAccountForm;
