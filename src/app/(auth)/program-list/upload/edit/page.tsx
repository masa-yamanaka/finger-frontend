"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import {
  Alert,
  Box,
  Paper,
  Stack,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";
import FileUpload from "@/components/fileUpload/FileUpload";
import { styled } from "@mui/material/styles";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import { mockUploadData } from "@/constants/program-list";
import ProgramListUploadEditDataGrid from "@/features/program-list/upload-data-grid/UploadEditDataGrid";

// Styled component for the TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  width: "200px",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const ProgramListUploadEditPage = () => {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    const newFiles = files.map((file) => ({
      id: file.name,
      name: file.name,
      file: file,
    }));

    setUploadedFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFile((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleConfirmUpload = async () => {
    // Add API here for upload
    setDialogType("success");
    setDialogTitle("アップロード完了しました");
    setDialogMessage("ファイルが正常にアップロードされました。");
    setIsModalOpen(true);
    console.log("Uploaded File Data:", uploadedFile);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (dialogType === "success") {
      router.push("/program-list/");
    }
  };

  return (
    <DefaultPageLayout title="番組確認一覧アップロード（更新）">
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​​
      </Alert>

      <FileUpload onUpload={handleUpload} />

      <Paper variant="outlined" sx={{ mt: 2 }}>
        <Stack direction="column" spacing={4} padding={2}>
          {/* Data table */}
          <TableContainer
            component={Paper}
            variant="outlined"
            elevation={0}
            sx={{ maxWidth: "50%", margin: "0 auto" }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <StyledTableCell>放送局</StyledTableCell>
                  <TableCell>{mockUploadData.tvStation}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>放送対象期間</StyledTableCell>
                  <TableCell>{mockUploadData.broadcastPeriod}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>ステータス</StyledTableCell>
                  <TableCell>{mockUploadData.status}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>アップロードファイル</StyledTableCell>
                  <TableCell>
                    <a
                      href={mockUploadData.uploadedFileUrl}
                      download
                      target="_blank"
                    >
                      {mockUploadData.uploadedFileName}
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Data Grid  */}
          <ProgramListUploadEditDataGrid
            uploadedFile={uploadedFile}
            onDeleteFile={handleDeleteFile}
          />
        </Stack>
      </Paper>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={uploadedFile.length === 0}
          onClick={handleConfirmUpload}
        >
          アップロード確定
        </Button>
      </Box>

      <StatusDialog
        open={isModalOpen}
        onClose={handleCloseModal}
        title={dialogTitle}
        message={dialogMessage}
        type={dialogType}
      />
    </DefaultPageLayout>
  );
};

export default ProgramListUploadEditPage;
