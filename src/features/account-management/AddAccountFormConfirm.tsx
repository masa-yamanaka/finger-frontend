"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  width: "200px",
  fontWeight: "bold",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const InputTableCell = styled(TableCell)({
  width: "600px",
  padding: "16px",
});

const ConfirmPage = () => {
  const router = useRouter();

  // Add API here to set formData
  const [formData, setFormData] = React.useState({
    businessType: "",
    businessName: "",
    role: "",
    loginId: "",
    email: "",
  });

  // Back button handler
  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    // Add API here to handle confirm
    console.log("Confirm data: ", formData);
    router.push("/account-management");
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Table>
          <TableBody>
            {/* Business Type */}
            <TableRow>
              <StyledTableCell>
                <Typography>事業者種類</Typography>
              </StyledTableCell>
              <InputTableCell>
                <Select
                  fullWidth
                  name="businessType"
                  value={formData.businessType}
                  disabled
                >
                  <MenuItem
                    key={formData.businessType}
                    value={formData.businessType}
                  >
                    {formData.businessType}
                  </MenuItem>
                </Select>
              </InputTableCell>
            </TableRow>

            {/* Business Name */}
            <TableRow>
              <StyledTableCell>
                <Typography>事業者名</Typography>
              </StyledTableCell>
              <InputTableCell>
                <Select
                  fullWidth
                  name="businessName"
                  value={formData.businessName}
                  disabled
                >
                  <MenuItem
                    key={formData.businessName}
                    value={formData.businessName}
                  >
                    {formData.businessName}
                  </MenuItem>
                </Select>
              </InputTableCell>
            </TableRow>

            {/* Role */}
            <TableRow>
              <StyledTableCell>
                <Typography>管理権限</Typography>
              </StyledTableCell>
              <InputTableCell>
                <Select fullWidth name="type" value={formData.role} disabled>
                  <MenuItem key={formData.role} value={formData.role}>
                    {formData.role}
                  </MenuItem>
                </Select>
              </InputTableCell>
            </TableRow>

            {/* Login ID */}
            <TableRow>
              <StyledTableCell>
                <Typography>ログインID</Typography>
              </StyledTableCell>
              <InputTableCell>
                <TextField
                  fullWidth
                  name="loginId"
                  value={formData.loginId}
                  disabled
                />
              </InputTableCell>
            </TableRow>

            {/* Email */}
            <TableRow>
              <StyledTableCell>
                <Typography>メールアドレス</Typography>
              </StyledTableCell>
              <InputTableCell>
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  disabled
                />
              </InputTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Button */}
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
