import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import FormButton from "../../forms/components/FormButton";

const UploadImagesForm = ({
  title = "",
  onSubmit,
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
  images,
  entityId,
  entityType,
}) => {
  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography align="center" variant="h5" component="h1" mb={2}>
        {title.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid
        container
        spacing={1}
        my={2}
        direction="row"
        width="100"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormButton
          node="Submit"
          onClick={() => onSubmit(images, entityId, entityType)}
          disabled={!Object.values(images).some((file) => file !== null)}
          size="large"
        />
      </Grid>
    </Box>
  );
};

export default UploadImagesForm;
