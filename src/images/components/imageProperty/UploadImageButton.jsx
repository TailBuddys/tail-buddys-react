import { Button, CircularProgress, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import React from "react";

function UploadImageButton({ onUpload, loading, entityId, entityType }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={loading ? <CircularProgress size={24} /> : <CloudUploadIcon />}
      disabled={loading}
      sx={{ height: 250, width: 250, margin: 1 }}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => {
          onUpload(e.target.files[0], entityId, entityType);
        }}
      />
    </Button>
  );
}

export default UploadImageButton;
