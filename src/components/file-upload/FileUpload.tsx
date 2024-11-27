import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, multiple = true }) => {
  const [loading, setLoading] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setLoading(true);
      onUpload(acceptedFiles);
      setLoading(false);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple });

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <Paper
        {...getRootProps()}
        elevation={0}
        sx={{
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: isDragActive ? "action.hover" : "background.paper",
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "divider",
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              {isDragActive ? (
                <Typography variant="body2" color="textSecondary" align="center">
                  ファイルをドロップしてください
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                  ファイルをここにドラッグアンドドロップ
                  <br />
                  またはクリックで場所を指定
                </Typography>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default FileUpload;
