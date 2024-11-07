"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const FileTable = ({ title, data }) => {
  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "10%" }}>#</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>
                アップロードユーザ
              </StyledTableCell>
              <StyledTableCell sx={{ width: "40%" }}>ファイル​</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>
                アップロード日
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((file) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell>{file.id}</StyledTableCell>
                <StyledTableCell>{file.userName}</StyledTableCell>
                <StyledTableCell>
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    download={file.fileName}
                  >
                    {file.fileName}
                  </a>
                </StyledTableCell>
                <StyledTableCell>{file.uploadDate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FileTable;
