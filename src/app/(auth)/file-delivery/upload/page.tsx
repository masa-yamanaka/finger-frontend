"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import FileDeliveryUploadDataGrid from "@/features/file-delivery/upload/FileDeliveryUploadDataGrid";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import FileDeliveryUploadTable from "@/features/file-delivery/upload/FileDeliveryUploadTable";

const FileDeliveryUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tableData, setTableData] = useState({});
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

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
    );
  };

  const handleTableDataChange = (data) => {
    setTableData(data);
  };

  const handleConfirmUpload = () => {
    setIsModalOpen(true);
    setDialogType("success");
    setDialogTitle("アップロード完了しました");
    setDialogMessage("ファイルが正常にアップロードされました。");
    console.log("Uploaded Files Data:", uploadedFiles);
    console.log("Table Data:", tableData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/file-delivery/");
  };

  return (
    <DefaultPageLayout title="納品ファイルアップロード画面">
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに納品ファイルをアップロードできます。​​
      </Alert>

      <Stack direction={"column"} spacing={2}>
        <FileUpload onUpload={handleUpload} />

        <FileDeliveryUploadDataGrid
          uploadedFiles={uploadedFiles}
          onDeleteFile={handleDeleteFile}
          onRowEdit={handleRowEdit}
        />

        <FileDeliveryUploadTable onTableDataChange={handleTableDataChange} />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={uploadedFiles.length === 0}
            onClick={handleConfirmUpload}
          >
            アップロード確定
          </Button>
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

export default FileDeliveryUploadPage;
