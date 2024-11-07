"use client";
import React, { useState } from "react";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box } from "@mui/material";
import FileUpload from "@/components/fileUpload/FileUpload";

const ProgramListUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    const newFiles = files.map((file) => ({
      id: file.name,
      name: file.name,
      date: null,
      reason: "",
      file: file, // Store the actual File object
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <DefaultPageLayout title="番組確認一覧アップロード">
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​​
      </Alert>
      <FileUpload onUpload={handleUpload} />

      <Box sx={{ mt: 2 }}>add data grid here</Box>
    </DefaultPageLayout>
  );
};

export default ProgramListUploadPage;
