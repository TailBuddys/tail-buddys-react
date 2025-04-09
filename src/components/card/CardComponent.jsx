import { Box, Card, Grid2 } from "@mui/material";
import React from "react";
import CardGalleryComponent from "./CardGalleryComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import { useUser } from "../../users/providers/UserProvider";

function CardComponent({ data }) {
  const { loginDog } = useUser();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 800, height: 500, m: 2, borderRadius: 5 }}>
        <Grid2 container size={12}>
          <Grid2 size={6}>
            <CardGalleryComponent data={data} />
          </Grid2>
          <Grid2 size={6}>
            <CardBody data={data} />
          </Grid2>
        </Grid2>
      </Card>
      {data.distance && loginDog ? <CardActionBar /> : null}
    </Box>
  );
}

export default CardComponent;
// קומפוננטה נטענת עוד לפני שמוצהרת בפועל //
