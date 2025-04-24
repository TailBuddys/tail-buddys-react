import React from "react";
import useForm from "../../forms/hooks/useForm";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import SignupForm from "../components/SignUpForm";
import Container from "@mui/material/Container";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import { Box } from "@mui/material";

export default function SignupPage() {
  const { handleSignup } = useUsers();

  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialSignupForm, signupSchema, handleSignup);

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
      <Box>
        <SignupForm
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
          title={"register form"}
          errors={errors}
          data={data}
          onInputChange={handleChange}
        />
      </Box>
    </Container>
  );
}
