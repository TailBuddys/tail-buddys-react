import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routsModel";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import CardDetailPage from "../cards/pages/CardDetailPage";
import SignupPage from "../users/pages/SignUpPage";
import LogInPage from "../users/pages/LogInPage";
import AddCardPage from "../cards/pages/AddCardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import MyCardsPage from "../cards/pages/MyCardsPage";
import FavoritCardsPage from "../cards/pages/FavoritCardsPage";
import EditUserPage from "../users/pages/EditUserPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../users/pages/ProfilePage";
import UsersTable from "../sandBox/UsersTable";

// ---------------for future dev functionality-----------------
// import ParentComponent from "../sandBox/optimization/ParentComponent";
// import ParentComponentPage from "../sandBox/context/ParentComponentPage";
// import SendBox from "../sandBox/SandBox";
// import Counter from "../sandBox/Counter";
// import LifeCycle from "../sandBox/LifeCycle";
// import Countries from "../sandBox/countries/Countries";
// import FormExample from "../sandBox/FormExample";
// import ResizedWindow from "../sandBox/ResizedWindow";
//--------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.CARDS} element={<CardsPage />} />
      <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
      <Route path={ROUTES.FAV_CARDS} element={<FavoritCardsPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CARD_INFO + "/:id"} element={<CardDetailPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.CREATE_CARD} element={<AddCardPage />} />
      <Route path={ROUTES.EDIT_CARD + "/:id"} element={<EditCardPage />} />
      <Route path="users-table" element={<UsersTable />} />
      <Route path={ROUTES.USER_PROFILE} element={<ProfilePage />} />
      {/* ---------------for future dev functionality-----------------
      <Route path={ROUTES.SANDBOX} element={<SendBox />}>
        <Route path="counter" element={<Counter />} />
        <Route path="LifeCycle" element={<LifeCycle />} />
        <Route path="countries" element={<Countries />} />
        <Route path="form" element={<FormExample />} />
        <Route path="ResizedWindow" element={<ResizedWindow />} />
        <Route path="optimization" element={<ParentComponent />} />
        <Route path="context" element={<ParentComponentPage />} />
      </Route> 
      ----------------------------------------------------------------*/}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
