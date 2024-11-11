"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { mockDeliveryFile } from "@/constants/file-delivery";
import FileDeliveryDownloadTable from "@/features/file-delivery/download/FileDeliveryDownloadTable";
import { Button, Stack, Typography } from "@mui/material";

const FileDeliveryDownloadPage = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]); // Ensure it's an array of file objects

  const handleReturn = () => {
    router.push("/file-delivery/");
  };

  const handleDownloadSelectedFiles = () => {
    // Add logic here for handling Downloads

    console.log("Downloading selected files:", selectedFiles);
  };

  return (
    <DefaultPageLayout title="納品ファイル連携ダウンロード画面​">
      <Typography variant="body1">ファイルが複数見つかりました​</Typography>
      <FileDeliveryDownloadTable
        title="納品ファイル​"
        data={mockDeliveryFile}
        onSelectFiles={setSelectedFiles} // Passing setSelectedFiles to the table
      />

      <Stack direction={"row"} mt={2} justifyContent={"space-between"}>
        <Button variant="contained" color="secondary" onClick={handleReturn}>
          閉じる
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadSelectedFiles}
          disabled={selectedFiles.length === 0} // Disable if no files are selected
        >
          ダウンロード
        </Button>
      </Stack>
    </DefaultPageLayout>
  );
};

export default FileDeliveryDownloadPage;
