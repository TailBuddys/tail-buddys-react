import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
// import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../users/pages/SignUpPage";
import LogInPage from "../users/pages/LogInPage";
import EditUserPage from "../users/pages/EditUserPage";
import ProfilePage from "../users/pages/ProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      {/* <Route path={ROUTES.ABOUT} element={<AboutPage />} /> */}
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<ProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
