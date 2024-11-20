"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/fileUpload/FileUpload";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Typography, Box, Button, Alert, Stack } from "@mui/material";
import UploadDataGrid from "@/features/program-information/upload-data-grid/UploadDataGrid";
import { mockApiCall } from "@/utils/mockApiCall";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import UploadButton from "@/components/button/upload-button/UploadButton";

interface UploadedFile {
  id: string;
  name: string;
  date?: Date | null;
  reason?: string;
  file: File; // The actual File object
}
const ProgramInformationUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    const newFiles: UploadedFile[] = files.map((file) => ({
      id: file.name, // Use a unique identifier
      name: file.name,
      startDate: new Date(),
      endDate: new Date(),
      reason: "入力してください",
      file: file, // Store the actual File object
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleReturn = () => {
    router.push("/program-information/");
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleRowEdit = (updatedFile: UploadedFile) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
    );
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
          setDialogMessage(
            "アップロード中にエラーが発生しました。再試行してください。"
          );
        }
      }
    } catch (error) {
      setLoading(false);
      setDialogType("error");
      setDialogTitle("アップロードエラー");
      setDialogMessage(
        "サーバーエラーが発生しました。後でもう一度お試しください。"
      );
    } finally {
      setLoading(false);
      setIsModalOpen(true);
      console.log("Uploaded Files Data:", uploadedFiles);
    }

    // For testing without API or error
    // setDialogType("success");
    // setDialogTitle("アップロード完了しました");
    // setDialogMessage("ファイルが正常にアップロードされました。");
    // setIsModalOpen(true);
    // console.log("Uploaded Files Data:", uploadedFiles);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (dialogType === 'success') {
      router.push("/program-information/");
    }
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
          onRowEdit={handleRowEdit}
        />
      </Box>

      <Stack direction="row" justifyContent={"space-between"} mt={2}>
        <Button variant="contained" color="error" onClick={handleReturn}>
          戻る
        </Button>
        <Box>
          <UploadButton
            onClick={handleConfirmUpload}
            loading={loading}
            disabled={uploadedFiles.length === 0 || loading}
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

export default ProgramInformationUploadPage;
