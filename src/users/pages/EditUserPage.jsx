import React, { useEffect, useRef } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import useUsers from "../hooks/useUsers";
import userEditSchema from "../models/userEditSchema";
import EditUserForm from "../components/EditUserForm";
import initialUserEditForm from "../helpers/initialForms/initialUserEditForm";
import userToModel from "../helpers/initialForms/userToModel";
import ROUTES from "../../routes/routesModel";
import { getUser } from "../../services/localStorageService";
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
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialUserEditForm, userEditSchema, (newUser) => {
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
      <EditUserForm
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
      />
    </Container>
  );
}
