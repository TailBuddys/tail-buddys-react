import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { Tooltip, Zoom } from "@mui/material";

const Form = ({
  title = "",
  onSubmit,
  onReset,
  validateForm,
  to = "/",
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
  onDelete = null,
}) => {
  const navigate = useNavigate();

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
        <Grid item xs={12} sm={4}>
          <FormButton
            node="cancel"
            color="error"
            component="div"
            variant="outlined"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Tooltip
          title="Clear Fields"
          slots={{
            transition: Zoom,
          }}
          arrow
          followCursor
        >
          <Grid item xs={12} sm={4}>
            <FormButton
              node={<LoopIcon />}
              variant="outlined"
              component="div"
              onClick={onReset}
            />
          </Grid>
        </Tooltip>
        {onDelete ? (
          <Grid item xs={12} sm={4}>
            <FormButton node="Delete card" color="error" onClick={onDelete} />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <FormButton
            node="Submit"
            onClick={onSubmit}
            disabled={!validateForm()}
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
