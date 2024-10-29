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
  mockAccountTypes,
  mockAccountNames,
  mockAccountRoles,
} from "@/constants/accounts";
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

const RegistrationForm = () => {
  const router = useRouter();
  const { accountData, setAccountData } = useAccountContext();
  const [formData, setFormData] = React.useState({
    type: accountData?.type || "",
    name: accountData?.name || "",
    role: accountData?.role || "",
    loginId: accountData?.loginId || "",
    email: accountData?.email || "",
  });

  React.useEffect(() => {
    // Update formData if accountData changes
    setFormData({
      type: accountData?.type || "",
      name: accountData?.name || "",
      role: accountData?.role || "",
      loginId: accountData?.loginId || "",
      email: accountData?.email || "",
    });
  }, [accountData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send state as query params
    // const query = new URLSearchParams(formData).toString();
    // router.push(`/account-management/add/confirm?${query}`);

    // Store form data in the context
    setAccountData(formData);
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
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "事業者種類を選択" }}
                >
                  <MenuItem value="" disabled>
                    事業者種類を選択
                  </MenuItem>
                  {mockAccountTypes.map((type) => (
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "事業者名を選択" }}
                >
                  <MenuItem value="" disabled>
                    事業者名を選択
                  </MenuItem>
                  {mockAccountNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
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
                  inputProps={{ "aria-label": "権限を選択" }}
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

export default RegistrationForm;
