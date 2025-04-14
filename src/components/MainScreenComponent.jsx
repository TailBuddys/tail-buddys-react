import { Box } from "@mui/material";
// import HomePage from "../pages/HomePage";
import DogsPage from "../dogs/pages/DogsPage";
import ParksPage from "../parks/pages/ParksPage";

const MainScreenComponent = ({ parksOrDogs }) => {
  return (
    <Box>
      {/* <HomePage /> */}
      {parksOrDogs === "dogs" ? <DogsPage /> : <ParksPage />}
    </Box>
  );
};

export default MainScreenComponent;
