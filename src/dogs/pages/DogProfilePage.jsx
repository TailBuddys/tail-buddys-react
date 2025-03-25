import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import {
  // Avatar,
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Error from "../../components/Error";
import { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import { getDogFromLocalStorage } from "../../services/localStorageService";
import useDogs from "../hooks/useDogs";
import { useNavigate } from "react-router-dom";
import EditDogButton from "../components/EditDogButton";

export default function DogProfilePage() {
  const { handleGetDogById, error, isLoading } = useDogs();
  const navigate = useNavigate();
  const [dogData, setDogData] = useState();

  useEffect(() => {
    const dog = getDogFromLocalStorage();
    if (!dog) {
      return navigate(ROUTES.ROOT);
    }
    const getData = async () => {
      setDogData(await handleGetDogById(dog));
    };
    getData();
  }, [handleGetDogById, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatGender = (gender) => {
    const genderMap = { 0: "Male", 1: "Female", 2: "Other" };
    return genderMap[gender] || "Unknown";
  };

  if (error) return <Error errorMessage={error} />;
  if (isLoading) return <Spinner />;
  if (dogData) {
    return (
      <Container>
        <PageHeader title="Dog Profile" />
        {/* <Avatar src={userData.image.url} alt={userData.image.alt} /> אולי נרצה תמונות ברירת מחדל */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Full Name:
                  <Typography>
                    {dogData.firstName + " " + dogData.lastName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  userID:<Typography>{dogData.id}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Email:<Typography>{dogData.email}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Phone:<Typography>{dogData.phone}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Birth Date:
                  <Typography>{formatDate(dogData.birthDate)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Gender:
                  <Typography>{formatGender(dogData.gender)}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <EditDogButton />
      </Container>
    );
  }
}
