import React from "react";
import useForm from "../../forms/hooks/useForm";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import SignupForm from "../components/CreateDogForm";
import Container from "@mui/material/Container";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function CreateDogPage() {
  const { handleSignup } = useUsers();

  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleDateChange,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const { user } = useUser();

  return user ? (
    <Navigate to={ROUTES.ROOT} replace />
  ) : (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"register form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        onDateChange={handleDateChange}
      />
      <GoogleLoginButton to={ROUTES.ROOT} />
    </Container>
  );
}
