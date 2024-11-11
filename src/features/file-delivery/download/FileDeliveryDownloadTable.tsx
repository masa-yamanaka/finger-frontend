import React, { useState, useEffect } from "react";
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
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
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

interface FileDeliveryDownloadTableProps {
  title: string;
  data: any[];
  onSelectFiles: (selectedFiles: any[]) => void;
}

const FileDeliveryDownloadTable: React.FC<FileDeliveryDownloadTableProps> = ({
  title,
  data,
  onSelectFiles,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const handleSelectRow = (file: any) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((selectedFile) => selectedFile.id !== file.id)
        : [...prevSelected, file]
    );
  };

  const handleSelectAllRows = () => {
    if (selectedFiles.length === paginatedData.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(paginatedData);
    }
  };

  const handleSelectionChange = () => {
    onSelectFiles(selectedFiles);
  };

  // Paginated data
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    handleSelectionChange();
  }, [selectedFiles]);

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={selectedFiles.length === paginatedData.length}
                  onChange={handleSelectAllRows}
                  sx={{ color: "white" }}
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: "10%" }}>#</StyledTableCell>
              <StyledTableCell sx={{ width: "15%" }}>
                アップロードユーザ
              </StyledTableCell>
              <StyledTableCell sx={{ width: "30%" }}>ファイル​</StyledTableCell>
              <StyledTableCell sx={{ width: "15%" }}>
                アップロード日
              </StyledTableCell>
              <StyledTableCell sx={{ width: "30%" }}>
                ファイル説明
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((file) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFiles.includes(file)}
                    onChange={() => handleSelectRow(file)}
                  />
                </StyledTableCell>
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
                <StyledTableCell>{file.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ borderTop: "1px solid #ccc" }}>
              <TablePagination
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="行数"
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FileDeliveryDownloadTable;
