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
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  mockAccountBusinessNames,
  mockAccountBusinessTypes,
  mockAccountRoles,
} from "@/constants/accounts";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add API here for nagivating to Confirm page
    console.log("Add account data: ", formData);
    router.push("/account-management/add/confirm");
  };

  return (
    <form onSubmit={handleSubmit}>
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
              </InputTableCell>
            </TableRow>

            {/* Name */}
            <TableRow>
              <StyledTableCell>
                <Typography>事業者名</Typography>
              </StyledTableCell>
              <InputTableCell>
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
              </InputTableCell>
            </TableRow>

            {/* Role */}
            <TableRow>
              <StyledTableCell>
                <Typography>管理権限</Typography>
              </StyledTableCell>
              <InputTableCell>
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
                  onChange={handleChange}
                  placeholder="ログインIDを入力"
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
                  onChange={handleChange}
                  placeholder="メールアドレスを入力"
                />
              </InputTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <Button type="submit" variant="contained" color="primary" size="large">
          入力完了
        </Button>
      </Box>
    </form>
  );
};

export default AddAccountForm;
