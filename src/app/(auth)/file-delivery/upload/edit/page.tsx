"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { mockFileDeliveryUploadData } from "@/constants/file-delivery";
import FileDeliveryUploadEditDataGrid from "@/features/file-delivery/upload/FileDeliveryUploadEditDataGrid";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import { mockApiCall } from "@/utils/mockApiCall";
import LoadingButton from "@/components/button/loading-button/LoadingButton";
import { filterDuplicateFiles } from "@/utils/file";

// Styled component for the TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  width: "200px",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const FileDeliveryUploadEditPage = () => {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);
    if (uploadedFile.length > 0) {
      setIsModalOpen(true);
      setDialogType("error");
      setDialogTitle("アップロードエラー");
      setDialogMessage("アップロードは１ファイルのみです");
      return;
    }

    setUploadedFile((prevFiles) => {
      // Check for duplicate files
      const { uniqueFiles, duplicateFiles } = filterDuplicateFiles(files, prevFiles);

      if (duplicateFiles.length > 0) {
        setIsModalOpen(true);
        setDialogType("error");
        setDialogTitle("アップロードエラー");
        setDialogMessage(` 同一ファイルのためアップロードできません：${duplicateFiles.map((f) => f.name).join(", ")}`);
      }

      const newFiles = uniqueFiles.map((file) => {
        return {
          id: file.name,
          name: file.name,
          message: "入力してください",
          file: file,
        };
      });

      return [...prevFiles, ...newFiles];
    });
  };

  const handleReturn = () => {
    router.push("/file-delivery/");
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFile((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile) => {
    setUploadedFile((prevFiles) => prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)));
  };

  const handleConfirmUpload = async () => {
    // Add API here for upload
    try {
      if (!loading) {
        setLoading(true);
        // Mock API Call
        // const response = await uploadFilesAPI(uploadedFile)
        const response = await mockApiCall();

        if (response.success) {
          setLoading(false);
          setDialogType("success");
          setDialogTitle("アップロード完了しました");
          setDialogMessage("ファイルが正常にアップロードされました。");
        } else {
          setLoading(false);
          setDialogType("error");
          setDialogTitle("アップロードエラー");
          setDialogMessage("アップロード中にエラーが発生しました。再試行してください。");
        }
      }
    } catch (error) {
      setLoading(false);
      setDialogType("error");
      setDialogTitle("アップロードエラー");
      setDialogMessage("サーバーエラーが発生しました。後でもう一度お試しください。");
    } finally {
      setLoading(false);
      setIsModalOpen(true);
      console.log("Uploaded Files Data:", uploadedFile);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (dialogType === "success") {
      router.push("/file-delivery/");
    }
  };

  return (
    <DefaultPageLayout title="納品ファイルアップロード​">
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​
      </Alert>

      <FileUpload onUpload={handleUpload} multiple={false} />

      <Paper variant="outlined" sx={{ mt: 2 }}>
        <Stack direction="column" spacing={4} padding={2}>
          <TableContainer component={Paper} variant="outlined" elevation={0} sx={{ maxWidth: "50%", margin: "0 auto" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <StyledTableCell>放送局</StyledTableCell>
                  <TableCell>{mockFileDeliveryUploadData.tvStation}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>対象年月</StyledTableCell>
                  <TableCell>{mockFileDeliveryUploadData.targetDate}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>ステータス</StyledTableCell>
                  <TableCell>{mockFileDeliveryUploadData.status}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>納品種別</StyledTableCell>
                  <TableCell>{mockFileDeliveryUploadData.deliveryType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {uploadedFile.length > 0 && (
            <Alert severity="warning" icon={false}>
              ファイル説明をダブルクリックで入力してください。
            </Alert>
          )}

          <FileDeliveryUploadEditDataGrid
            uploadedFile={uploadedFile}
            onDeleteFile={handleDeleteFile}
            onRowEdit={handleRowEdit}
          />
        </Stack>
      </Paper>

      <Stack direction="row" justifyContent={"space-between"} mt={2}>
        <Button variant="contained" color="error" onClick={handleReturn}>
          戻る
        </Button>
        <Box>
          <LoadingButton
            onClick={handleConfirmUpload}
            loading={loading}
            disabled={uploadedFile.length === 0 || loading}
            buttonText="アップロード確定"
          />
        </Box>
      </Stack>

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

export default FileDeliveryUploadEditPage;
