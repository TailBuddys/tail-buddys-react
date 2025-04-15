import { Box } from "@mui/material";
// import HomePage from "../pages/HomePage";
import DogsPage from "../dogs/pages/DogsPage";
import ParksPage from "../parks/pages/ParksPage";

const MainScreenComponent = ({
  isLoading,
  error,
  parksData,
  setPresentedPark,
  presentedPark,
  parksOrDogs,
}) => {
  return (
    <Box>
      {/* <HomePage /> */}
      {parksOrDogs === "dogs" ? (
        <DogsPage />
      ) : (
        <ParksPage
          isLoading={isLoading}
          error={error}
          parksData={parksData}
          setPresentedPark={setPresentedPark}
          presentedPark={presentedPark}
        />
      )}
    </Box>
  );
};

export default MainScreenComponent;
