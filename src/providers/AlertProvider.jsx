import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getDogsFiltersFromLocalStorage,
  getParksFiltersFromLocalStorage,
  removeDogsFiltersFromLocalStorage,
  removeParksFiltersFromLocalStorage,
  setDogsFiltersInLocalStorage,
  setParksFiltersInLocalStorage,
} from "../services/localStorageService";
import { MultiSelect } from "primereact/multiselect";
import useDogs from "../dogs/hooks/useDogs";
import { useUser } from "../users/providers/UserProvider";

// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { useSnackbar } from "./SnackbarProvider";

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [color, setColor] = useState("info");
  const [title, setTitle] = useState("Info");
  const [message, setMessage] = useState("");
  const [entityType, setEntityType] = useState("");
  const [operation, setOperation] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchDogTypes } = useDogs();
  const { loginDog } = useUser();
  // const { snackbarActivation } = useSnackbar();

  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [distance, setDistance] = useState(10);
  const [dogLikes, setDogLikes] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchDogTypes().then((dogTypes) => {
      const formattedBreeds = dogTypes.map((breed) => ({
        name: breed.displayName,
        code: breed.value.toString(),
      }));
      setBreeds(formattedBreeds);
    });
    setIsLoading(false);
  }, [fetchDogTypes]);

  const [size, setSize] = useState(null);
  const Sizes = [
    { name: "Small", code: 0 },
    { name: "Medium", code: 1 },
    { name: "Large", code: 2 },
  ];
  const [gender, setGender] = useState(null);
  const Genders = [
    { name: "Male", code: true },
    { name: "Female", code: false },
  ];
  const [vaccinated, setVaccinated] = useState(null);
  const VaccinatedStates = [
    { name: "Yes", code: true },
    { name: "No", code: false },
  ];

  const handleClose = () => {
    setAlertOpen(false);
    setPopUpOpen(false);
    setFiltersData(null);
    setDistance(10);
    setDogLikes(0);
    setSelectedBreeds([]);
    setSize(null);
    setGender(null);
    setVaccinated(null);
  };

  const handleOk = () => {
    if (operation) operation();
    handleClose();
  };

  const handleSaveFilters = () => {
    if (entityType === "parks") {
      setParksFiltersInLocalStorage({
        distance,
        dogLikes,
      });
    } else {
      setDogsFiltersInLocalStorage({
        distance,
        breeds: selectedBreeds,
        size: size,
        gender: gender,
        vaccinated: vaccinated,
      });
    }
    if (operation) operation();
    handleClose();
  };

  // const handleCopyToClipboard = () => {
  //   handleClose();
  //   snackbarActivation("info", "copied to Clipboard");
  // };

  const alertActivation = useCallback(
    (color, title, message, operation = null) => {
      setAlertOpen(true);
      setColor(color);
      setTitle(title);
      setMessage(message);
      setOperation(() => operation);
    },
    []
  );

  const popUpFilterSelection = useCallback(
    (color, title, entityType, operation = null) => {
      setPopUpOpen(true);
      setColor(color);
      setTitle(title);
      setEntityType(entityType);
      if (entityType === "parks") {
        setFiltersData(getParksFiltersFromLocalStorage());
      } else {
        setFiltersData(getDogsFiltersFromLocalStorage());
      }
      setOperation(() => operation);
    },
    []
  );

  useEffect(() => {
    if (!filtersData) return;

    if (entityType === "parks") {
      setDistance(filtersData.distance ?? 10);
      setDogLikes(filtersData.dogLikes ?? 0);
    } else {
      setDistance(filtersData.distance ?? 100);
      setSelectedBreeds(filtersData.breeds ?? []);
      setSize(filtersData.size ?? []);
      setGender(filtersData.gender ?? []);
      setVaccinated(filtersData.vaccinated ?? []);
    }
  }, [filtersData, entityType]);

  return (
    <Box>
      <AlertContext.Provider value={{ alertActivation, popUpFilterSelection }}>
        {children}
      </AlertContext.Provider>

      <Backdrop open={alertOpen} sx={{ zIndex: 1000 }}>
        <Stack
          sx={{ width: 350, position: "reletive", zIndex: 1001 }}
          spacing={2}
        >
          <Alert severity={color} variant="filled">
            <AlertTitle>{title}</AlertTitle>
            {message}
            <br />
            <br />
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              {
                // operation ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleOk}
                >
                  OK
                </Button>
                // ) : (<CopyToClipboard text={message} onCopy={handleCopyToClipboard}>
                //     <Button variant="outlined" color="inherit" size="small">
                //       Copy
                //     </Button>
                //   </CopyToClipboard>)
              }
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                {!operation ? "ok" : "cancel"}
              </Button>
            </Box>
          </Alert>
        </Stack>
      </Backdrop>

      <Backdrop open={popUpOpen} sx={{ zIndex: 1000 }}>
        <Stack
          sx={{
            width: 700,
            position: "relative",
            zIndex: 1001,
          }}
          spacing={2}
        >
          <Alert
            severity={color}
            variant="filled"
            sx={{
              width: 700,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "pink", /////////
              // overflow: "auto", // Ensures scrollbar appears when content overflows
              // maxHeight: "80vh", // Limits height and enables scrolling if needed
              "& .MuiAlert-message": {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
          >
            <AlertTitle>{title}</AlertTitle>
            Here you can optimize your {entityType} filters:
            <br />
            <br />
            {loginDog && (
              <Box sx={{ width: "90%", px: 2 }}>
                <Typography>Distance:</Typography>
                <Slider
                  color="secondary"
                  defaultValue={10}
                  value={distance}
                  onChange={(e, value) => setDistance(value)}
                  valueLabelDisplay="auto"
                  shiftStep={5}
                  step={5}
                  marks
                  min={5}
                  max={100}
                  sx={{
                    maxWidth: 600,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Box>
            )}
            {entityType === "parks" ? (
              <Box sx={{ width: "90%", px: 2 }}>
                <Typography>Park Likes:</Typography>
                <Slider
                  color="secondary"
                  defaultValue={0}
                  value={dogLikes}
                  onChange={(e, value) => setDogLikes(value)}
                  valueLabelDisplay="auto"
                  shiftStep={1}
                  step={1}
                  marks
                  min={0}
                  max={20}
                  sx={{
                    maxWidth: 600,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Box>
            ) : (
              <>
                <Box sx={{ width: "90%", px: 2 }}>
                  <Typography>Breeds Types:</Typography>
                  <Box
                    sx={{
                      maxWidth: "600px",
                      overflowX: "auto",
                      position: "relative",

                      "& .p-multiselect-label-container": {
                        display: "flex",
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                          height: "4px",
                        },
                      },

                      "& .p-chip": {
                        flexShrink: 0,
                      },
                    }}
                  >
                    <MultiSelect
                      value={selectedBreeds}
                      onChange={(e) => setSelectedBreeds(e.value)}
                      options={breeds}
                      optionLabel="name"
                      filter
                      placeholder="Select Breed"
                      loading={isLoading}
                      display="chip"
                      className="w-full md:w-20rem"
                      style={{
                        minWidth: "300px",
                        maxWidth: "600px",
                      }}
                    />
                  </Box>
                  <Typography>Dog Sizes:</Typography>
                  <MultiSelect
                    value={size}
                    onChange={(e) => setSize(e.value)}
                    options={Sizes}
                    optionLabel="name"
                    filter
                    placeholder="Select Sizes"
                    display="chip"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                  />
                </Box>
                <Box sx={{ width: "90%", px: 2 }}>
                  <Typography>Select Gender:</Typography>
                  <MultiSelect
                    value={gender}
                    onChange={(e) => setGender(e.value)}
                    options={Genders}
                    optionLabel="name"
                    filter
                    placeholder="Select Genders"
                    display="chip"
                    maxSelectedLabels={2}
                    className="w-full md:w-20rem"
                  />
                </Box>
                <Box sx={{ width: "90%", px: 2 }}>
                  <Typography>Vaccinated Dogs:</Typography>
                  <MultiSelect
                    value={vaccinated}
                    onChange={(e) => setVaccinated(e.value)}
                    options={VaccinatedStates}
                    optionLabel="name"
                    filter
                    placeholder="Select If Vaccinated"
                    display="chip"
                    maxSelectedLabels={2}
                    className="w-full md:w-20rem"
                  />
                </Box>
              </>
            )}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleSaveFilters}
              >
                Save Filters
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  if (entityType === "parks") {
                    removeParksFiltersFromLocalStorage();
                    setFiltersData({});
                    if (operation) operation();
                    handleClose();
                  } else {
                    removeDogsFiltersFromLocalStorage();
                    setFiltersData({});
                    if (operation) operation();
                    handleClose();
                  }
                }}
              >
                Clean Filters
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Alert>
        </Stack>
      </Backdrop>
    </Box>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useSnackbar must be used within a Provider");
  return context;
};
