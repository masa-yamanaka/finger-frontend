"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button, Stack } from "@mui/material";
import FileUpload from "@/components/file-upload/FileUpload";
import ProgramListUploadDataGrid from "@/features/program-list/upload-data-grid/ProgramListUploadDataGrid";
import { mockApiCall } from "@/utils/mockApiCall";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import LoadingButton from "@/components/button/loading-button/LoadingButton";
import { filterDuplicateFiles } from "@/utils/file";
import { extractTextBeforeUnderscore } from "@/utils/string";

const ProgramListUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleReturn = () => {
    router.push("/program-list/");
  };

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
        // Extract the text (tv station) before the first underscore from the file name
        const tvStation = extractTextBeforeUnderscore(file.name);

        return {
          id: file.name,
          name: file.name,
          tvStation: tvStation,
          publishDateTime: new Date(),
          creationDeadline: new Date(),
          file: file,
        };
      });

      return [...prevFiles, ...newFiles];
    });
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile) => {
    setUploadedFiles((prevFiles) => prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)));
  };

  const handleConfirmUpload = async () => {
    // Add API here for upload
    console.log("Uploaded Files Data:", uploadedFiles);

    try {
      if (!loading) {
        setLoading(true);
        // Mock API Call
        const response = await mockApiCall(); // const response = await uploadFilesAPI(uploadedFiles)

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
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (dialogType === "success") {
      router.push("/program-list/");
    }
  };

  return (
    <DefaultPageLayout title="番組確認一覧アップロード">
      <Stack direction="column" spacing={2}>
        {/* Top Alert Section  */}
        <Alert severity="info">
          ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​​
        </Alert>

        {/* File Upload Section  */}
        <FileUpload onUpload={handleUpload} />

        {/* Warning Section  */}
        {uploadedFiles.length > 0 && (
          <Alert severity="warning" icon={false}>
            公開日時と作成完了期限をダブルクリックで入力してください。
          </Alert>
        )}

        {/* Data Grid Sectiond */}
        <ProgramListUploadDataGrid
          uploadedFiles={uploadedFiles}
          onDeleteFile={handleDeleteFile}
          onRowEdit={handleRowEdit}
        />

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

export default ProgramListUploadPage;
