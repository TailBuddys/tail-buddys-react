import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
// import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignupPage from "../users/pages/SignUpPage";
import LogInPage from "../users/pages/LogInPage";
import EditUserPage from "../users/pages/EditUserPage";

import CreateDogPage from "../dogs/pages/CreateDogPage";
import UserProfilePage from "../users/pages/UserProfilePage";
import MainPage from "../pages/MainPage";
import EditDogPage from "../dogs/pages/EditDogPage";
import DogProfilePage from "../dogs/pages/DogProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MainPage />} />
      {/* <Route path={ROUTES.ABOUT} element={<AboutPage />} /> */}
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
      <Route path={ROUTES.CREATE_DOG} element={<CreateDogPage />} />
      <Route path={ROUTES.EDIT_DOG} element={<EditDogPage />} />
      <Route path={ROUTES.DOG_PROFILE} element={<DogProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
