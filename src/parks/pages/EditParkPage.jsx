import React, { useEffect, useState } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import ROUTES from "../../routes/routesModel";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import EditImagesPage from "../../images/components/EditImagesPage";
import CustomTabPanel from "../../components/CustomTabPanel";
import useImages from "../../images/hooks/useImages";
import useParks from "../hooks/useParks";
import initialParkForm from "../helpers/initialForms/initialParkForm";
import editParkSchema from "../models/editParkSchema";
import ParkDataToModel from "../helpers/initialForms/parkToModel";
import EditParkForm from "../components/EditParkForm";
import { getUser } from "../../services/localStorageService";

export default function EditParkPage() {
  const navigate = useNavigate();
  const { handleUpdatePark, handleGetParkById, isParkLoading, parkError } =
    useParks();
  const { id } = useParams();
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
  } = useForm(initialParkForm, editParkSchema, (newPark) => {
    handleUpdatePark(newPark);
  });
  const { alertActivation } = useAlert();
  const {
    imageData,
    handleUploadOneImage,
    handleDeleteImage,
    handleReorderImages,
  } = useImages();

  useEffect(() => {
    handleGetParkById(id).then((data) => {
      const modelPark = ParkDataToModel(data);
      setData(modelPark);
    });
  }, [handleGetParkById, navigate, setData, id, imageData, selectedTab]);

  const confirmEdit = () => {
    onSubmit(onSubmit());
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    const user = getUser();
    if (!user || user.IsAdmin === "False") {
      return navigate(ROUTES.ROOT);
    }
  }, [navigate]);

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
            <Tab label="Edit Park" {...a11yProps(0)} />
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
            <EditParkForm
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
              title={"edit Park form"}
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
            isLoading={isParkLoading}
            error={parkError}
            onUpload={handleUploadOneImage}
            onDelete={handleDeleteImage}
            onReorder={handleReorderImages}
            data={data}
            entityId={data.id}
            entityType={1}
          />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
