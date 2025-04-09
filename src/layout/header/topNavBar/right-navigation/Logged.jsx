import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useMediaQuery, Zoom } from "@mui/material";
import UserMenu from "./UserMenu";
import { useUser } from "../../../../users/providers/UserProvider";
import DogMenu from "./DogMenu";
import { useDog } from "../../../../dogs/providers/DogProvider";
import PetsIcon from "@mui/icons-material/Pets";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

const Logged = ({ userData }) => {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  const [isUserOpen, setUserOpen] = useState(false);
  const [isDogOpen, setDogOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const { loginDog } = useUser();
  const { userDogs } = useDog();

  useEffect(() => {
    setUserOpen(false);
    setDogOpen(false);
  }, [screenSize]);

  return (
    <>
      {loginDog && userDogs ? (
        <>
          <Tooltip
            title="Dog Menu"
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <IconButton
              sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
              onClick={(event) => {
                setAnchor(event.currentTarget);
                setDogOpen(true);
              }}
            >
              {userDogs.find((dog) => dog.id === Number(loginDog))?.imageUrl !==
              null ? (
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt={"dog avatar"}
                  src={
                    userDogs.find((dog) => dog.id === Number(loginDog))
                      ?.imageUrl
                  }
                />
              ) : (
                <Avatar>
                  <PetsIcon />
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
          <DogMenu
            anchorEl={anchorEL}
            isOpen={isDogOpen}
            onClose={() => setDogOpen(false)}
          />
        </>
      ) : (
        <NavBarLink to={ROUTES.CREATE_DOG} sx={{ marginLeft: 15 }}>
          <Tooltip
            title="Create New Dog"
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <Avatar alt="add new dog" src="\assets\images\addDogIcon.png" />
          </Tooltip>
        </NavBarLink>
      )}

      <Tooltip
        title="User Menu"
        slots={{
          transition: Zoom,
        }}
        arrow
      >
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={(event) => {
            setAnchor(event.currentTarget);
            setUserOpen(true);
          }}
        >
          <Avatar alt="person & dog" src="\assets\images\userDogIcon.png" />
        </IconButton>
      </Tooltip>
      <UserMenu
        anchorEl={anchorEL}
        isOpen={isUserOpen}
        onClose={() => setUserOpen(false)}
      />
    </>
  );
};

export default Logged;
