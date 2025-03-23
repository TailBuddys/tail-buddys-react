import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useUser } from "../../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import useUsers from "../../../../users/hooks/useUsers";
import { useUser } from "../../../../users/providers/UserProvider";

export default function RightNavBar() {
  const { user } = useUser();
  const { handleGetUser, handleEdit } = useUsers();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    user
      ? handleGetUser(user._id).then((data) => {
          setUserData(data);
        })
      : setUserData(false);
  }, [handleGetUser, user, handleEdit]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {user && <Logged userData={userData} />}
      {!user && <NotLogged />}
    </Box>
  );
}
