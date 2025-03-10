import { CardMedia, Typography } from "@mui/material";
import React from "react";

export default function ErrorPage() {
  return (
    <>
      <Typography sx={{ marginTop: "25px" }}>
        <strong>Error 404 page not found</strong>
      </Typography>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "700px",
        }}
      >
        <CardMedia
          component="img"
          image="/assets/imgs/brokenRobotError.png"
          alt="broken robot"
          sx={{ maxWidth: "40%", alignItems: "center", marginLeft: "30vw" }}
        />
      </div>
    </>
  );
}
