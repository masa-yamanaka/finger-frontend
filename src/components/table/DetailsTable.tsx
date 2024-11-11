import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface DetailsTableProps {
  data: { label: string; value: React.ReactNode }[];
}

// Styled component for the TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  width: "200px",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const DetailsTable: React.FC<DetailsTableProps> = ({ data }) => (
  <TableContainer
    component={Paper}
    variant="outlined"
    elevation={0}
    sx={{ margin: "0 auto" }}
  >
    <Table>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <StyledTableCell component="th" scope="row">
              {row.label}
            </StyledTableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DetailsTable;
