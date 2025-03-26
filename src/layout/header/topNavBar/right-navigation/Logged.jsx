import React, { useEffect, useRef, useState } from "react";
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
  const anchorRef = useRef();
  const { loginDog } = useUser();
  const { userDogs } = useDog();

  useEffect(() => {
    setAnchor(anchorRef.current);
  }, []);

  useEffect(() => {
    setUserOpen(false);
    setDogOpen(false);
  }, [screenSize]);

  return (
    <>
      {loginDog && userDogs ? (
        <Tooltip title="Dog Menu" TransitionComponent={Zoom} arrow>
          <IconButton
            sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
            onClick={() => setDogOpen(true)}
          >
            {userDogs.find((dog) => dog.id === Number(loginDog))?.imageUrl !==
            null ? (
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={"dog avatar"}
                src={
                  userDogs.find((dog) => dog.id === Number(loginDog))?.imageUrl
                }
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                <PetsIcon />
              </Avatar>
            )}
          </IconButton>
          <DogMenu
            anchorEl={anchorEL}
            isOpen={isDogOpen}
            onClose={() => setDogOpen(false)}
          />
        </Tooltip>
      ) : (
        <NavBarLink to={ROUTES.CREATE_DOG}>
          <Avatar alt="add new dog" src="\assets\images\addDogIcon.png" />
        </NavBarLink>
      )}

      <Tooltip title="User Menu" TransitionComponent={Zoom} arrow>
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={() => setUserOpen(true)}
        >
          {userData && (
            <Avatar alt="person & dog" src="\assets\images\userDogIcon.png" />
          )}
        </IconButton>
        <UserMenu
          anchorEl={anchorEL}
          isOpen={isUserOpen}
          onClose={() => setUserOpen(false)}
        />
      </Tooltip>
    </>
  );
};

export default Logged;
