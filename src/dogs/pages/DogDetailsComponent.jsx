import React, { useEffect } from "react";
import {
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import useDogs from "../hooks/useDogs";

export default function DogDetailsComponent({ dogData }) {
  const { dogTypes, fetchDogTypes } = useDogs();

  useEffect(() => {
    fetchDogTypes();
  }, [fetchDogTypes]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const calculateAge = (dateString) => {
    if (!dateString) return "N/A";

    const birthDate = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();

    if (now.getDate() < birthDate.getDate()) {
      months -= 1;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    if (years < 1) {
      return `${months} month${months !== 1 ? "s" : ""} old`;
    }
    return `${years} year${years !== 1 ? "s" : ""} old`;
  };

  const formatGender = (gender) => {
    const genderMap = { false: "Male", true: "Female" };
    return genderMap[gender] || "Unknown";
  };

  const formatSize = (size) => {
    const sizeMap = { 0: "Small", 1: "Medium", 2: "Large" };
    return sizeMap[size] || "Unknown";
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>
                  {dogData.name} , {calculateAge(dogData.birthDate)}
                </Typography>
                <Typography>{dogTypes[dogData.type].displayName}</Typography>
                {dogData.distance && (
                  <Typography>{dogData.distance} meters away</Typography>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {dogData.address && (
                  <Typography>Address: {dogData.address}</Typography>
                )}
                <Typography>Description: {dogData.description}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Size: {formatSize(dogData.size)}</Typography>
                <Typography>
                  Birth Date: {formatDate(dogData.birthDate)}
                </Typography>
                <Typography>Gender: {formatGender(dogData.gender)}</Typography>
                {dogData.vaccinated ? (
                  <Typography>
                    Vaccinated:{" "}
                    <VaccinesIcon
                      sx={{
                        color: pink[600],
                        opacity: 1,
                      }}
                    />
                  </Typography>
                ) : (
                  <Typography>
                    Vaccinated:{" "}
                    <VaccinesIcon
                      sx={{
                        color: "grey",
                        opacity: 0.4,
                      }}
                    />
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
