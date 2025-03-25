import MuiMenu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useUser } from "../../../../users/providers/UserProvider";
import ROUTES from "../../../../routes/routesModel";
import MenuLink from "../../../../routes/components/MenuLink";

const DogMenu = ({ isOpen, anchorEl, onClose }) => {
  const { loginDog } = useUser();

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
              text="edit Dog"
              navigateTo={ROUTES.EDIT_DOG}
              onClick={onClose}
            />
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default DogMenu;
