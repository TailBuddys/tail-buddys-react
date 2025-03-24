import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { Typography, useMediaQuery, Zoom } from "@mui/material";
import UserMenu from "./UserMenu";
import { useUser } from "../../../../users/providers/UserProvider";
import DogMenu from "./DogMenu";

const Logged = ({ userData }) => {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  const [isUserOpen, setUserOpen] = useState(false);
  const [isDogOpen, setDogOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const anchorRef = useRef();
  const { loginDog } = useUser();

  useEffect(() => {
    setAnchor(anchorRef.current);
  }, []);

  useEffect(() => {
    setUserOpen(false);
    setDogOpen(false);
  }, [screenSize]);

  return (
    <>
      {loginDog ? (
        <Tooltip title="Open Menu" TransitionComponent={Zoom} arrow>
          <IconButton
            sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
            onClick={() => setDogOpen(true)}
          >
            {userData ? (
              <Avatar alt={userData.image} src={userData.image} />
            ) : (
              <Avatar alt="avatar" src="/assets/imgs/avatarLogged.png" />
            )}
          </IconButton>
          <DogMenu
            anchorEl={anchorEL}
            isOpen={isDogOpen}
            onClose={() => setDogOpen(false)}
          />
        </Tooltip>
      ) : (
        <Typography>++</Typography>
      )}

      <Tooltip title="Open Menu" TransitionComponent={Zoom} arrow>
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={() => setUserOpen(true)}
        >
          {userData ? (
            <Avatar alt={userData.image} src={userData.image} />
          ) : (
            <Avatar alt="avatar" src="/assets/imgs/avatarLogged.png" />
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
