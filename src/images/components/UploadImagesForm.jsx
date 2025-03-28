import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import FormButton from "../../forms/components/FormButton";

const UploadImagesForm = ({
  title = "",
  onSubmit,
  validateForm,
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
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
          onClick={onSubmit}
          //   disabled={!validateForm()}
          size="large"
        />
      </Grid>
    </Box>
  );
};

export default UploadImagesForm;
