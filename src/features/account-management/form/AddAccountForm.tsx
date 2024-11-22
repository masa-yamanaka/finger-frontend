"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Select, MenuItem, TextField, Button, Stack } from "@mui/material";
import { mockAccountBusinessNames, mockAccountBusinessTypes, mockAccountRoles } from "@/constants/accounts";
import AccountTable from "../component/AccountTable";
import { isValidEmail } from "@/utils/string";

const AddAccountForm = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    businessType: "",
    businessName: "",
    role: "",
    loginId: "",
    email: "",
  });
  const [emailError, setEmailError] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (!isValidEmail(formData.email)) {
      setEmailError("有効なメールアドレスを入力してください。");
      return;
    }

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
        <Select fullWidth name="businessType" value={formData.businessType} onChange={handleChange} displayEmpty>
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
        <Select fullWidth name="businessName" value={formData.businessName} onChange={handleChange} displayEmpty>
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
        <Select fullWidth name="role" value={formData.role} onChange={handleChange} displayEmpty>
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
          error={!!emailError}
          helperText={emailError}
        />
      ),
    },
  ];

  return (
    <form>
      <AccountTable rows={rows} />

      <Stack direction="row" spacing={4} justifyContent="center" m={4}>
        <Button variant="contained" color="error" size="large" onClick={handleBack}>
          戻る
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          入力完了
        </Button>
      </Stack>
    </form>
  );
};

export default AddAccountForm;
