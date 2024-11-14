"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Alert, Box, Button } from "@mui/material";
import FileUpload from "@/components/fileUpload/FileUpload";
import ProgramListUploadDataGrid from "@/features/program-list/upload-data-grid/UploadDataGrid";
import { mockApiCall } from "@/utils/mockApiCall";
import StatusDialog from "@/components/modals/Status/StatusDialog";

const ProgramListUploadPage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleUpload = (files: File[]) => {
    console.info("Uploading:", files);

    const newFiles = files.map((file) => ({
      id: file.name,
      name: file.name,
      publishDate: null,
      creationDeadline: null,
      // publishDate: new Date(),
      // creationDeadline: new Date(),
      file: file, // Store the actual File object
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

  const handleConfirmUpload = async () => {
    // Add API here for upload
    try {
      // Mock API Call
      // const response = await uploadFilesAPI(uploadedFiles)
      const response = await mockApiCall();

      if (response.success) {
        setDialogType("success");
        setDialogTitle("アップロード完了しました");
        setDialogMessage("ファイルが正常にアップロードされました。");
      } else {
        setDialogType("error");
        setDialogTitle("アップロードエラー");
        setDialogMessage(
          "アップロード中にエラーが発生しました。再試行してください。"
        );
      }
    } catch (error) {
      setDialogType("error");
      setDialogTitle("アップロードエラー");
      setDialogMessage(
        "サーバーエラーが発生しました。後でもう一度お試しください。"
      );
    } finally {
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
