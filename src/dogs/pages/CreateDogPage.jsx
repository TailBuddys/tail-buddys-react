import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import CreateDogForm from "../components/CreateDogForm";
import useDogs from "../hooks/useDogs";
import useForm from "../../forms/hooks/useForm";
import initialCreateDogForm from "../helpers/initialForms/initialCreateDogForm";
import createDogSchema from "../models/createDogSchema";
import { getUser } from "../../services/localStorageService";

export default function CreateDogPage() {
  const { handleCreateDog } = useDogs();
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
  } = useForm(initialCreateDogForm, createDogSchema, handleCreateDog);

  useEffect(() => {
    const user = getUser();
    if (!user) {
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
      <CreateDogForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"register form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        resetGoogleAddressRef={resetGoogleAddressRef}
        handleSelectAddress={handleSelectAddress}
      />
    </Container>
  );
}
