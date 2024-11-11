"use client";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert } from "@mui/material";
import React from "react";

const FileDeliveryUploadEditPage = () => {
  const handleUpload = () => {
    console.log("File uploaded");
  };

  return (
    <DefaultPageLayout title="納品ファイルアップロード​">
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​
      </Alert>
      <FileUpload onUpload={handleUpload} />
    </DefaultPageLayout>
  );
};

export default FileDeliveryUploadEditPage;
