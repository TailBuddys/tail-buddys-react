import { Grid2 } from "@mui/material";
import React from "react";
import MatchScreenComponent from "../matches/components/MatchScreenComponent";
import MainScreenComponent from "../components/MainScreenComponent";
import ChatScreenComponent from "../chats/components/ChatScreenComponent";

const MainPage = () => {
  return (
    <Grid2 container>
      <Grid2 container size={10}>
        <Grid2 size={12}>
          <MatchScreenComponent />
        </Grid2>
        <Grid2 size={12}>
          <MainScreenComponent />
        </Grid2>
      </Grid2>
      <Grid2 container size={2}>
        <Grid2 size={12}>
          <ChatScreenComponent />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MainPage;
