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
  mockAccounts,
  mockAccountBusinessTypes,
  mockAccountBusinessNames,
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

const EditAccountForm = () => {
  const router = useRouter();

  // Add API here to fetch the data
  // Using the first item from mock for testing
  //   const [formData, setFormData] = React.useState(mockAccounts[0]);
  const [formData, setFormData] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Confirm edit data: ", formData);
    router.push("/account-management/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Table>
          <TableBody>
            {/* Name */}
            <TableRow>
              <StyledTableCell>
                <Typography>名前</Typography>
              </StyledTableCell>
              <InputTableCell>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </InputTableCell>
            </TableRow>

            {/* Kana */}
            <TableRow>
              <StyledTableCell>
                <Typography>カナちゃん</Typography>
              </StyledTableCell>
              <InputTableCell>
                <TextField
                  fullWidth
                  name="kana"
                  value={formData.kana}
                  onChange={handleChange}
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
                />
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
                />
              </InputTableCell>
            </TableRow>

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
              </InputTableCell>
            </TableRow>

            {/* Bussiness Name */}
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
          </TableBody>
        </Table>
      </TableContainer>

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
