import React, { useEffect, useRef } from "react";
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

export default function EditDogPage() {
  const { handleGetDogById, handleUpdateDog } = useDogs();
  const navigate = useNavigate();
  const dogRef = useRef(getDogFromLocalStorage());

  const {
    data,
    setData,
    gender,
    setGender,
    size,
    setSize,
    dogType,
    setDogType,
    errors,
    resetGoogleAddressRef,
    handleChange,
    handleDateChange,
    handleGenderChange,
    handleSizeChange,
    handleTypeChange,
    handleSelectAddress,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditDogForm, editDogSchema, (newDog) => {
    handleUpdateDog(dogRef.current, newDog);
  });
  const { alertActivation } = useAlert();

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
        gender={gender}
        setGender={setGender}
        dogType={dogType}
        setDogType={setDogType}
        size={size}
        setSize={setSize}
        onInputChange={handleChange}
        onDateChange={handleDateChange}
        handleGenderChange={handleGenderChange}
        handleTypeChange={handleTypeChange}
        handleSelectAddress={handleSelectAddress}
        resetGoogleAddressRef={resetGoogleAddressRef}
        handleSizeChange={handleSizeChange}
      />
    </Container>
  );
}
