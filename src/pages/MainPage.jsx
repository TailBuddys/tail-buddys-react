import { Grid2, Typography } from "@mui/material";
import React from "react";
import MatchScreenComponent from "../matches/components/MatchScreenComponent";
import MainScreenComponent from "../components/MainScreenComponent";
import ChatScreenComponent from "../chats/components/ChatScreenComponent";
import { useUser } from "../users/providers/UserProvider";

const MainPage = () => {
  const { seeParksOrDogs } = useUser();

  return seeParksOrDogs === "dogs" ? (
    <Grid2 container>
      <Grid2 container size={10}>
        <Grid2 size={12}>
          <MatchScreenComponent />
        </Grid2>
        <Grid2 size={12}>
          <MainScreenComponent parksOrDogs={seeParksOrDogs} />
        </Grid2>
      </Grid2>
      <Grid2 container size={2}>
        <Grid2 size={12}>
          <ChatScreenComponent />
        </Grid2>
      </Grid2>
    </Grid2>
  ) : (
    <Grid2 container>
      <Grid2 container size={8}>
        <Grid2 size={12}>
          <Typography sx={{ display: "flex", justifyContent: "end" }}>
            פילטרים || יצירת פארק
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <MainScreenComponent parksOrDogs={seeParksOrDogs} />
        </Grid2>
      </Grid2>
      <Grid2 container size={4}>
        <Grid2 size={12}>
          <Typography>מפות</Typography>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MainPage;
