"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Checkbox,
} from "@mui/material";
import {
  mockAccountBusinessTypes,
  mockAccountBusinessNames,
  mockAccountRoles,
} from "@/constants/accounts";
import AccountTable from "../component/AccountTable";
import StatusDialog from "@/components/modals/Status/StatusDialog";

const EditAccountForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessType: "",
    businessName: "",
    role: "",
    loginId: "",
    email: "",
  });

  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = () => {
    // Add API here for submit
    setIsModalOpen(true);
    setDialogType("success");
    setDialogTitle("編集完了しました");
    setDialogMessage("");
    console.log("Confirm edit data: ", formData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/account-management/");
  };

  const handleBack = () => {
    router.push("/account-management/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsEmailEditable(event.target.checked);
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
    {
      label: "ログインID",
      input: (
        <TextField
          fullWidth
          name="loginId"
          value={formData.loginId}
          onChange={handleChange}
          disabled
        />
      ),
    },
    {
      label: (
        <span>
          <Checkbox
            checked={isEmailEditable}
            onChange={handleCheckboxChange}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          パスワード初期化
        </span>
      ),
      input: (
        <TextField
          fullWidth
          name="email"
          placeholder="通知先メールアドレス"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEmailEditable}
        />
      ),
    },
  ];

  return (
    <form>
      <AccountTable rows={rows} />

      {/* Open Modal Button */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 4, gap: 2 }}>
        <Button
          onClick={handleBack}
          variant="contained"
          color="secondary"
          size="large"
        >
          戻る
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          確定
        </Button>
      </Box>

      {/* Confirm Edit Modal */}
      <StatusDialog
        open={isModalOpen}
        onClose={handleCloseModal}
        title={dialogTitle}
        message={dialogMessage}
        type={dialogType}
      />
    </form>
  );
};

export default EditAccountForm;
