import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";

import { getUser } from "../../services/localStorageService";
import useParks from "../hooks/useParks";
import createParkSchema from "../models/createParkSchema";
import CreateParkForm from "../components/CreateParkForm";
import initialParkForm from "../helpers/initialForms/initialParkForm";

export default function CreateParkPage() {
  const { handleCreatePark } = useParks();
  const navigate = useNavigate();

  const {
    data,
    errors,
    resetGoogleAddressRef,
    handleChange,
    handleSelectAddress,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialParkForm, createParkSchema, handleCreatePark);

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
      <CreateParkForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"create park form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        resetGoogleAddressRef={resetGoogleAddressRef}
        handleSelectAddress={handleSelectAddress}
      />
    </Container>
  );
}
