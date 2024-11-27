"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Typography, Box, Button, Alert, Stack } from "@mui/material";
import { mockApiCall } from "@/utils/mockApiCall";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import LoadingButton from "@/components/button/loading-button/LoadingButton";
import ProgramInformationUploadDataGrid, {
  UploadedFile,
} from "@/features/program-information/upload-data-grid/ProgramInformationUploadDataGrid";
import { filterDuplicateFiles } from "@/utils/file";

const ProgramInformationUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = React.useState(false);

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
          broadcastPeriodStart: new Date(),
          broadcastPeriodEnd: new Date(),
          message: "入力してください",
          file: file,
        };
      });

      return [...prevFiles, ...newFiles];
    });
  };

  const handleReturn = () => {
    router.push("/program-information/");
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile: UploadedFile) => {
    setUploadedFiles((prevFiles) => prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)));
  };

  const handleConfirmUpload = async () => {
    // Add API here for upload
    try {
      if (!loading) {
        setLoading(true);
        // Mock API Call
        // const response = await uploadFilesAPI(uploadedFiles)
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
      console.log("Uploaded Files Data:", uploadedFiles);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (dialogType === "success") {
      router.push("/program-information/");
    }
  };

  return (
    <DefaultPageLayout title="番組情報アップロード">
      <Stack direction="column" spacing={2}>
        {/* Message Area */}
        <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>

        {/* Top Alert Section  */}
        <Alert severity="info">
          ここに番組表情報ファイルをアップロードできます。アップロードを契機に放送局様へ自動でメール通知します。​
        </Alert>

        {/* File Upload Section  */}
        <FileUpload onUpload={handleUpload} />

        {/* Warning Section  */}
        {uploadedFiles.length > 0 && (
          <Alert severity="warning" icon={false}>
            対象放送期間をダブルクリックで入力してください。
          </Alert>
        )}

        {/* Data Grid Section */}
        <ProgramInformationUploadDataGrid
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

export default ProgramInformationUploadPage;
