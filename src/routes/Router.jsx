import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignupPage from "../users/pages/SignUpPage";
import LogInPage from "../users/pages/LogInPage";
import EditUserPage from "../users/pages/EditUserPage";

import CreateDogPage from "../dogs/pages/CreateDogPage";
import UserProfilePage from "../users/pages/UserProfilePage";
import MainPage from "../pages/MainPage";
import EditDogPage from "../dogs/pages/EditDogPage";
import UploadDogImagesPage from "../dogs/pages/UploadDogImagesPage";
import DogProfilePage from "../dogs/pages/DogProfilePage";
import CreateParkPage from "../parks/pages/CreateParkPage";
import UploadParkImagesPage from "../parks/pages/UploadParkImagesPage";
import ParkProfilePage from "../parks/pages/ParkProfilePage";
import EditParkPage from "../parks/pages/EditParkPage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MainPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
      <Route path={ROUTES.CREATE_DOG} element={<CreateDogPage />} />
      <Route path={ROUTES.EDIT_DOG} element={<EditDogPage />} />
      <Route path={ROUTES.DOG_PROFILE} element={<DogProfilePage />} />
      <Route path={ROUTES.UPLOAD_DOG_IMAGE} element={<UploadDogImagesPage />} />
      <Route path={ROUTES.CREATE_PARK} element={<CreateParkPage />} />
      <Route path={ROUTES.EDIT_PARK + "/:id"} element={<EditParkPage />} />
      <Route
        path={ROUTES.PARK_PROFILE + "/:id"}
        element={<ParkProfilePage />}
      />
      <Route
        path={ROUTES.UPLOAD_PARK_IMAGE + "/:id"}
        element={<UploadParkImagesPage />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
