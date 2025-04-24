import React, { useEffect, useRef, useState } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import ROUTES from "../../routes/routesModel";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";
import { getDogFromLocalStorage } from "../../services/localStorageService";
import editDogSchema from "../models/editDogSchema";
import initialEditDogForm from "../helpers/initialForms/initialEditDogForm";
import useDogs from "../hooks/useDogs";
import EditDogForm from "../components/EditDogForm";
import { Box, Tab, Tabs } from "@mui/material";
import EditImagesPage from "../../images/components/EditImagesPage";
import CustomTabPanel from "../../components/CustomTabPanel";
import useImages from "../../images/hooks/useImages";
import editDogToModel from "../helpers/initialForms/editDogToModel";

export default function EditDogPage() {
  const { handleGetDogById, handleUpdateDog } = useDogs();
  const navigate = useNavigate();
  const dogRef = useRef(getDogFromLocalStorage());
  const [selectedTab, setselectedTab] = useState(0);

  const HandlePickTab = (event, pickedTab) => {
    // לבדוק
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
  const {
    imageData,
    isLoading,
    handleUploadOneImage,
    handleDeleteImage,
    handleReorderImages,
  } = useImages();

  useEffect(() => {
    const dog = dogRef.current;

    if (dog) {
      handleGetDogById(dog).then((data) => {
        const modelDog = editDogToModel(data);
        setData(modelDog);
      });
    } else {
      navigate(ROUTES.ROOT);
    }
  }, [handleGetDogById, setData, navigate, imageData, selectedTab]);

  const confirmEdit = () => {
    onSubmit(onSubmit);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
          </Container>
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          <EditImagesPage
            isLoading={isLoading}
            onUpload={handleUploadOneImage}
            onDelete={handleDeleteImage}
            onReorder={handleReorderImages}
            data={data}
            entityId={dogRef.current}
            entityType={0}
          />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
