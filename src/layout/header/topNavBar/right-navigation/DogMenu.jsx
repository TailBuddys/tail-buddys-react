import MuiMenu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useUser } from "../../../../users/providers/UserProvider";
import ROUTES from "../../../../routes/routesModel";
import MenuLink from "../../../../routes/components/MenuLink";
import { useDog } from "../../../../dogs/providers/DogProvider";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import useDogs from "../../../../dogs/hooks/useDogs";
import { useEffect, useState } from "react";
import "../../../../styles/general.css";

const DogMenu = ({ isOpen, anchorEl, onClose }) => {
  const { loginDog } = useUser();
  const { userDogs } = useDog();
  const { handleSwitchDog } = useDogs();
  const [fullDog, setFullDog] = useState();

  useEffect(() => {
    const fullLoginDog = () => {
      setFullDog(userDogs?.find((dog) => dog.id === Number(loginDog)));
    };
    fullLoginDog();
  }, [loginDog, userDogs]);

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: "40px",
          },
        },
      }}
    >
      <Box>
        {loginDog && (
          <>
            <Typography
              className="headers-typography"
              sx={{ textAlign: "center" }}
            >
              {fullDog?.name}
            </Typography>
            <Divider variant="middle" />
            <MenuLink
              text="Dog Profile"
              navigateTo={ROUTES.DOG_PROFILE}
              onClick={onClose}
            />
            <MenuLink
              text="Edit Dog"
              navigateTo={ROUTES.EDIT_DOG}
              onClick={onClose}
            />
            <MenuLink
              text="Create Dog"
              navigateTo={ROUTES.CREATE_DOG}
              onClick={onClose}
            />
          </>
        )}
      </Box>
      {userDogs ? (
        <Box>
          {userDogs.length >= 2 && <Divider variant="middle" />}
          {userDogs
            ?.filter((dog) => dog.id !== Number(loginDog))
            .map((dog) => (
              <Box key={dog.id} sx={{ display: "flex" }}>
                <IconButton
                  sx={{
                    borderRadius: 3,
                    margin: 0.5,
                  }}
                  onClick={() => {
                    handleSwitchDog(dog.id);
                  }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt={"dog avatar"}
                    src={dog.imageUrl}
                  />
                  <Typography>{dog.name}</Typography>
                </IconButton>
              </Box>
            ))}
        </Box>
      ) : null}
    </MuiMenu>
  );
};

export default DogMenu;
