import { Box } from "@mui/material";
// import HomePage from "../pages/HomePage";
import DogsPage from "../dogs/pages/DogsPage";
import ParksPage from "../parks/pages/ParksPage";
import Spinner from "./Spinner";
import Error from "./Error";

const MainScreenComponent = ({
  isLoading,
  error,
  dogsData,
  parksData,
  setPresentedPark,
  presentedPark,
  parksOrDogs,
}) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Box>
      {/* <HomePage /> */}
      {parksOrDogs === "dogs" ? (
        <DogsPage isLoading={isLoading} error={error} dogsData={dogsData} />
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
