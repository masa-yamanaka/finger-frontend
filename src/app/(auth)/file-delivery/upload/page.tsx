"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import FileDeliveryUploadDataGrid, { UploadedFile } from "@/features/file-delivery/upload/FileDeliveryUploadDataGrid";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import FileDeliveryUploadTable from "@/features/file-delivery/upload/FileDeliveryUploadTable";
import { mockApiCall } from "@/utils/mockApiCall";
import LoadingButton from "@/components/button/loading-button/LoadingButton";
import { filterDuplicateFiles } from "@/utils/file";

const FileDeliveryUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [tableData, setTableData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    setUploadedFiles((prevFiles) => {
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
          description: "入力してください",
          file: file,
        };
      });

      return [...prevFiles, ...newFiles];
    });
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile: UploadedFile) => {
    setUploadedFiles((prevFiles) => prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)));
  };

  const handleTableDataChange = (data) => {
    setTableData(data);
  };

  const handleConfirmUpload = async () => {
    // Add API here for upload
    try {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        // Mock API Call
        // const response = await uploadFilesAPI(uploadedFiles)
        const response = await mockApiCall();

        if (response.success) {
          setSuccess(true);
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
      console.log("Uploaded Files Data:", uploadedFiles);
      console.log("Uploaded Table Data:", tableData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (success) {
      router.push("/file-delivery/");
    }
  };

  const handleReturn = () => {
    router.push("/file-delivery/");
  };

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  return (
    <DefaultPageLayout title="納品ファイルアップロード">
      <Stack direction="column" spacing={2}>
        {/* Message Area */}
        <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>

        {/* Top Alert Section  */}
        <Alert severity="info">ここに納品ファイルをアップロードできます。​​</Alert>

        {/* File Upload Section  */}
        <FileUpload onUpload={handleUpload} />

        {/* Warning Section  */}
        {uploadedFiles.length > 0 && (
          <Alert severity="warning" icon={false}>
            ファイル説明をダブルクリックで入力してください。
          </Alert>
        )}

        {/* Data Grid Section  */}
        <FileDeliveryUploadDataGrid
          uploadedFiles={uploadedFiles}
          onDeleteFile={handleDeleteFile}
          onRowEdit={handleRowEdit}
        />

        {/* Table Section  */}
        <FileDeliveryUploadTable onTableDataChange={handleTableDataChange} />

        {/* Buttons  */}
        <Stack direction="row" justifyContent={"space-between"}>
          <Button variant="contained" color="error" onClick={handleReturn}>
            戻る
          </Button>
          <Box>
            <LoadingButton
              onClick={handleConfirmUpload}
              loading={loading}
              disabled={uploadedFiles.length === 0 || loading}
              buttonText="アップロード確定"
            />
          </Box>
        </Stack>
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

export default FileDeliveryUploadPage;
