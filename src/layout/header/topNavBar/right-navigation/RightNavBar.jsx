import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import useUsers from "../../../../users/hooks/useUsers";
import { useUser } from "../../../../users/providers/UserProvider";
import { Zoom } from "@mui/material";
import SwitchButton from "../../../../components/SwitchButton";

export default function RightNavBar() {
  const { user, loginDog, seeParksOrDogs } = useUser();
  const { handleGetUser, handleEdit, handleSwitchParksDogs } = useUsers();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    user
      ? handleGetUser(user.id).then((data) => {
          setUserData(data);
        })
      : setUserData(false);
  }, [handleGetUser, user, handleEdit]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {user &&
        (loginDog ? (
          <Tooltip
            title="Switch Parks Or Dogs"
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <SwitchButton
              disabled={!loginDog}
              checked={seeParksOrDogs !== "dogs"}
              onChange={handleSwitchParksDogs}
            />
          </Tooltip>
        ) : (
          <Tooltip
            title="Creat Dog To Switch"
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <span>
              <SwitchButton
                disabled={!loginDog}
                checked={seeParksOrDogs !== "dogs"}
                onChange={null}
              />
            </span>
          </Tooltip>
        ))}
      {user && <Logged userData={userData} />}
      {!user && <NotLogged />}
    </Box>
  );
}
