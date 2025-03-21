import React, { useEffect, useRef } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import useUsers from "../hooks/useUsers";
import editSchema from "../models/editSchema";
import EditForm from "../components/EditDogForm";
import initialEditForm from "../helpers/initialForms/initialEditForm";
import userToModel from "../helpers/initialForms/userToModel";
import ROUTES from "../../routes/routesModel";
import { getUser } from "../services/localStorageService";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";

export default function EditUserPage() {
  const { handleUpdateUser, handleGetUser } = useUsers();
  const navigate = useNavigate();
  const userRef = useRef(getUser());

  const {
    data,
    setData,
    errors,
    handleChange,
    handleDateChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditForm, editSchema, (newUser) => {
    handleUpdateUser(userRef.current, newUser);
  });
  const { alertActivation } = useAlert();

  useEffect(() => {
    const user = userRef.current;
    if (user) {
      handleGetUser(user.id).then((data) => {
        const modelUser = userToModel(data);
        setData(modelUser);
      });
    } else {
      navigate(ROUTES.ROOT);
    }
  }, [handleGetUser, setData, navigate]);

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
      <EditForm
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
        title={"edit form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        onDateChange={handleDateChange}
      />
    </Container>
  );
}
