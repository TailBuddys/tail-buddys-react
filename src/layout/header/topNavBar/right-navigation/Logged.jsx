import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useMediaQuery, Zoom } from "@mui/material";
import Menu from "./Menu";

const Logged = ({ userData }) => {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  const [isOpen, setOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const anchorRef = useRef();

  useEffect(() => {
    setAnchor(anchorRef.current);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [screenSize]);

  return (
    <Tooltip title="Open Menu" TransitionComponent={Zoom} arrow>
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        {userData ? (
          <Avatar alt={userData.image.alt} src={userData.image.url} />
        ) : (
          <Avatar alt="avatar" src="/assets/imgs/avatarLogged.png" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEL}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </Tooltip>
  );
};

export default Logged;
