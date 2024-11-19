import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { green } from "@mui/material/colors";

interface UploadButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  buttonText: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick, loading, disabled, buttonText }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Button variant="contained" color="primary" onClick={onClick} disabled={disabled || loading}>
        {buttonText}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default UploadButton;
