"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProgramListDownloadTable = ({ title, data, pagination = false }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  // Paginated data
  const paginatedData = pagination ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "10%" }}>#</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>アップロードユーザ</StyledTableCell>
              <StyledTableCell sx={{ width: "40%" }}>ファイル​</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>アップロード日</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((file) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell>{file.id}</StyledTableCell>
                <StyledTableCell>{file.userName}</StyledTableCell>
                <StyledTableCell>
                  <a href={file.fileUrl} target="_blank" download={file.fileName}>
                    {file.fileName}
                  </a>
                </StyledTableCell>
                <StyledTableCell>{file.uploadDate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ borderTop: "1px solid #ccc" }}>
              {pagination && (
                <TablePagination
                  count={data.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="行数"
                  rowsPerPageOptions={[5, 10, 25]}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProgramListDownloadTable;
