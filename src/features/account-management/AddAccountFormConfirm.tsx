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
import { useAccountContext } from "@/context/AccountContext";

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
  const { accountData } = useAccountContext();

  // Back button handler
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  const handleConfirm = () => {
    // Add API call here
    console.log("Confirm account data: ", accountData);
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
            {/* Type */}
            <TableRow>
              <StyledTableCell>
                <Typography>事業者種類</Typography>
              </StyledTableCell>
              <InputTableCell>
                <Select fullWidth name="type" value={accountData.type} disabled>
                  <MenuItem key={accountData.type} value={accountData.type}>
                    {accountData.type}
                  </MenuItem>
                </Select>
              </InputTableCell>
            </TableRow>

            {/* Name */}
            <TableRow>
              <StyledTableCell>
                <Typography>事業者名</Typography>
              </StyledTableCell>
              <InputTableCell>
                <Select fullWidth name="type" value={accountData.name} disabled>
                  <MenuItem key={accountData.name} value={accountData.name}>
                    {accountData.name}
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
                <Select fullWidth name="type" value={accountData.role} disabled>
                  <MenuItem key={accountData.role} value={accountData.role}>
                    {accountData.role}
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
                  value={accountData.loginId}
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
                  value={accountData.email}
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
          variant="outlined"
          color="secondary"
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
