import React, { useEffect, useRef, useState } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import ROUTES from "../../routes/routesModel";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";
import DogDataToModel from "../helpers/initialForms/dogToModel";
import { getDogFromLocalStorage } from "../../services/localStorageService";
import editDogSchema from "../models/editDogSchema";
import initialEditDogForm from "../helpers/initialForms/initialEditDogForm";
import useDogs from "../hooks/useDogs";
import EditDogForm from "../components/EditDogForm";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import EditImagesPage from "../../images/components/EditImagesPage";

//-----
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//---
export default function EditDogPage() {
  const { handleGetDogById, handleUpdateDog } = useDogs();
  const navigate = useNavigate();
  const dogRef = useRef(getDogFromLocalStorage());
  const [selectedTab, setselectedTab] = useState("1");

  const HandlePickTab = (event, pickedTab) => {
    setselectedTab(pickedTab);
  };

  const {
    data,
    setData,
    errors,
    resetGoogleAddressRef,
    handleChange,
    handleSelectAddress,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditDogForm, editDogSchema, (newDog) => {
    handleUpdateDog(newDog);
  });
  const { alertActivation } = useAlert();
  //-- דרך עקיפה זמנית
  const [dogData, setDogData] = useState();

  useEffect(() => {
    const dog = getDogFromLocalStorage();
    if (!dog) {
      return navigate(ROUTES.ROOT);
    }
    const getData = async () => {
      setDogData(await handleGetDogById(dog));
    };
    getData();
  }, [handleGetDogById, navigate]);
  //---
  useEffect(() => {
    const dog = dogRef.current;
    if (dog) {
      handleGetDogById(dog).then((data) => {
        const modelDog = DogDataToModel(data);
        setData(modelDog);
      });
    } else {
      navigate(ROUTES.ROOT);
    }
  }, [handleGetDogById, setData, navigate]);

  const confirmEdit = () => {
    onSubmit(onSubmit);
  };

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={HandlePickTab}
            aria-label="basic tabs example"
          >
            <Tab label="Edit Dog" {...a11yProps(0)} />
            <Tab label="Edit Images" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          <EditDogForm
            onSubmit={() => {
              alertActivation(
                "info",
                "Edit Confirmation",
                "Are you sure you want to save changes?",
                confirmEdit
              );
            }}
            onReset={handleReset}
            validateForm={validateForm}
            title={"edit dog form"}
            errors={errors}
            data={data}
            onInputChange={handleChange}
            handleSelectAddress={handleSelectAddress}
            resetGoogleAddressRef={resetGoogleAddressRef}
          />
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          <EditImagesPage dogData={dogData} />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
