import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import useUsers from "../../../../users/hooks/useUsers";
import { useUser } from "../../../../users/providers/UserProvider";
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
          <SwitchButton
            disabled={!loginDog}
            checked={seeParksOrDogs !== "dogs"}
            onChange={handleSwitchParksDogs}
          />
        ) : (
          <SwitchButton
            disabled={!loginDog}
            checked={seeParksOrDogs !== "dogs"}
            onChange={null}
          />
        ))}
      {user && <Logged userData={userData} />}
      {!user && <NotLogged />}
    </Box>
  );
}
