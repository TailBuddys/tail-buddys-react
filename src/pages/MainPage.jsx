import { Avatar, Button, Grid2, Tooltip, Zoom } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
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
import { useAlert } from "../providers/AlertProvider";
import useDogs from "../dogs/hooks/useDogs";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import useMatches from "../matches/hooks/useMatches";

const MainPage = () => {
  const { seeParksOrDogs, user } = useUser();
  const { dog } = useDog();
  const [presentedPark, setPresentedPark] = useState();
  const { handleGetAllParks, isParkLoading, parkError } = useParks();
  const { handleGetUnmatchedDogs, isLoading, error } = useDogs();
  const [parksData, setParksData] = useState([]);
  const [dogsData, setDogsData] = useState([]);
  const { popUpFilterSelection } = useAlert();
  const {
    handleMatchInteraction,
    handleGetAllMatches,
    handleUpdateMatche,
    matches,
    setMatches,
  } = useMatches();

  // for parks
  useEffect(() => {
    handleGetAllParks(dog?.id).then((parks) => {
      setParksData(parks);
      setPresentedPark(parks[0]);
    });
  }, [handleGetAllParks, dog]);

  const onParkFilterConfirmation = () => {
    handleGetAllParks(dog?.id).then((parks) => {
      setParksData(parks);
      setPresentedPark(parks[0]);
    });
  };
  // for dogs
  useEffect(() => {
    if (dog) {
      handleGetUnmatchedDogs(dog?.id).then((dogs) => {
        setDogsData(dogs);
      });
    }
  }, [handleGetUnmatchedDogs, dog]);

  const onDogFilterConfirmation = () => {
    handleGetUnmatchedDogs(dog?.id).then((dogs) => {
      setDogsData(dogs);
    });
  };

  useEffect(() => {
    if (dog) {
      handleGetAllMatches(dog?.id).then((matches) => {
        setMatches(matches);
      }); //?????????????????? לרנדר שוב
    }
  }, [handleGetAllMatches, setMatches, dog]);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return seeParksOrDogs === "dogs" ? (
    <Grid2 container>
      <Grid2 container size={10}>
        <Grid2 size={12}>
          <MatchScreenComponent
            handleUnmatch={handleUpdateMatche}
            matches={matches}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button
            onClick={() => {
              popUpFilterSelection(
                "info",
                "Dogs filters",
                "dogs",
                onDogFilterConfirmation
              );
            }}
          >
            <TuneIcon />
          </Button>
          <MainScreenComponent
            parksOrDogs={seeParksOrDogs}
            isLoading={isParkLoading}
            error={parkError}
            dogsData={dogsData}
            handleLikeUnlikeDog={handleMatchInteraction}
          />
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
          <Tooltip
            title="Set filters"
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <Button
              onClick={() => {
                popUpFilterSelection(
                  "info",
                  "Parks filters",
                  "parks",
                  onParkFilterConfirmation
                );
              }}
            >
              <TuneIcon />
            </Button>
          </Tooltip>
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
