import MuiMenu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useUser } from "../../../../users/providers/UserProvider";
import ROUTES from "../../../../routes/routesModel";
import MenuLink from "../../../../routes/components/MenuLink";
import { useDog } from "../../../../dogs/providers/DogProvider";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import useDogs from "../../../../dogs/hooks/useDogs";

const DogMenu = ({ isOpen, anchorEl, onClose }) => {
  const { loginDog } = useUser();
  const { userDogs } = useDog();
  const { handleSwitchDog } = useDogs();

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
    >
      <Box>
        {loginDog && (
          <>
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
              text="Create New Dog"
              navigateTo={ROUTES.CREATE_DOG}
              onClick={onClose}
            />
          </>
        )}
      </Box>
      {userDogs ? (
        <Box>
          <Divider />
          {userDogs
            ?.filter((dog) => dog.id !== Number(loginDog)) // Exclude loginDog
            .map((dog) => (
              <Box key={dog.id} sx={{ display: "flex" }}>
                <IconButton
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
