import { Avatar, Grid2, Tooltip, Typography, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import MatchScreenComponent from "../matches/components/MatchScreenComponent";
import MainScreenComponent from "../components/MainScreenComponent";
import ChatScreenComponent from "../chats/components/ChatScreenComponent";
import { useUser } from "../users/providers/UserProvider";
import GoogleMapComponent from "../components/GoogleMapComponent";
import useParks from "../parks/hooks/useParks";
import { useDog } from "../dogs/providers/DogProvider";
import NavBarLink from "../routes/components/NavBarLink";
import ROUTES from "../routes/routesModel";

const MainPage = () => {
  const { seeParksOrDogs, user } = useUser();
  const { dog } = useDog();
  const [presentedPark, setPresentedPark] = useState();
  const { handleGetAllParks, isLoading, error } = useParks();
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    handleGetAllParks(dog?.id).then((parks) => {
      setParksData(parks);
      setPresentedPark(parks[0]);
    });
  }, [handleGetAllParks, dog]);

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
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "end" }}>
          {user?.IsAdmin === "True" && (
            <NavBarLink to={ROUTES.CREATE_PARK} sx={{ marginLeft: 15 }}>
              <Tooltip
                title="Create New park"
                slots={{
                  transition: Zoom,
                }}
                arrow
              >
                <Avatar
                  alt="add new park"
                  src="\assets\images\addParkIcon.png"
                />
              </Tooltip>
            </NavBarLink>
          )}

          <Typography sx={{ display: "flex", justifyContent: "end" }}>
            פילטרים
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <MainScreenComponent
            isLoading={isLoading}
            error={error}
            parksOrDogs={seeParksOrDogs}
            parksData={parksData}
            setPresentedPark={setPresentedPark}
            presentedPark={presentedPark}
          />
        </Grid2>
      </Grid2>
      <Grid2 container size={4}>
        <Grid2 size={12}>
          <GoogleMapComponent
            parksData={parksData}
            setPresentedPark={setPresentedPark}
            presentedPark={presentedPark}
            dogData={dog}
            isLoading={isLoading}
            error={error}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MainPage;
