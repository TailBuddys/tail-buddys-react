import React from "react";
import {
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function DogDetailsComponent({ dogData }) {
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
    const genderMap = { false: "Male", true: "Female" };
    return genderMap[gender] || "Unknown";
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name:
                <Typography>{dogData.name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Description:<Typography>{dogData.description}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Type:<Typography>{dogData.type}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Size:<Typography>{dogData.size}</Typography>
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
            <TableRow>
              <TableCell>
                Address:
                <Typography>{dogData.address}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Vaccinated:
                <Typography>{dogData.vaccinated}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
