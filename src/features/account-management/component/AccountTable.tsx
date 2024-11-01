import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Row {
  label: string;
  input: React.ReactNode;
}

interface AccountTableProps {
  rows: Row[];
}

// Styled components
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

const AccountTable: React.FC<AccountTableProps> = ({ rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell>
                <Typography>{row.label}</Typography>
              </StyledTableCell>
              <InputTableCell>{row.input}</InputTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
