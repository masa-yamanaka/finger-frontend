"use client";
import React, { useState } from "react";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Typography, Box, Button, Alert } from "@mui/material";
import UploadDataGrid from "@/features/program-information/upload-data-grid/UploadDataGrid";

interface UploadedFile {
  id: string;
  name: string;
  date: Date | null;
  reason: string;
  file: File; // The actual File object
}
const ProgramInformationUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    const newFiles: UploadedFile[] = files.map((file) => ({
      id: file.name,
      name: file.name,
      date: null,
      reason: "",
      file: file, // Store the actual File object
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile: UploadedFile) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
    );
  };

  const handleConfirmUpload = () => {
    console.log("Uploaded Files Data:", uploadedFiles);
  };

  return (
    <DefaultPageLayout title="番組情報アップロード">
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表情報ファイルをアップロードできます。アップロードを契機に放送局様へ自動でメール通知します。​
      </Alert>

      <FileUpload onUpload={handleUpload} />

      <Box sx={{ mt: 2 }}>
        <UploadDataGrid
          uploadedFiles={uploadedFiles}
          onDeleteFile={handleDeleteFile}
          onRowEdit={handleRowEdit} // Pass the edit handler to the DataGrid
        />
      </Box>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmUpload}
        >
          アップロード確定
        </Button>
      </Box>
    </DefaultPageLayout>
  );
};

export default ProgramInformationUploadPage;
