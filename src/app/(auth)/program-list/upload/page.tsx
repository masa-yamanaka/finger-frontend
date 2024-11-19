"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button, Stack } from "@mui/material";
import FileUpload from "@/components/fileUpload/FileUpload";
import ProgramListUploadDataGrid from "@/features/program-list/upload-data-grid/UploadDataGrid";
import { mockApiCall } from "@/utils/mockApiCall";
import StatusDialog from "@/components/modals/Status/StatusDialog";
import UploadButton from "@/components/button/upload-button/UploadButton";

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

    const newFiles = files.map((file) => {
      // Extract text before the first underscore from the file name
      const tvStation = file.name.includes("_") ? file.name.split("_")[0] : "";

      return {
        id: file.name,
        name: file.name,
        tvStation: tvStation,
        publishDateTime: null,
        creationDeadline: null,
        file: file,
      };
    });

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
      <Alert severity="info" sx={{ mb: 2 }}>
        ここに番組表確認一覧ファイルをアップロードできます。アップロードを契機に放送局様・NTTデータへ自動でメール通知します。​​
      </Alert>
      <FileUpload onUpload={handleUpload} />

      <Box sx={{ mt: 2 }}>
        <ProgramListUploadDataGrid
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

      {/* Modal for success and error */}
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
