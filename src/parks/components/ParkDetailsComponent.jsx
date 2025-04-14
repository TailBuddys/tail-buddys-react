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

export default function ParkDetailsComponent({ parkData }) {
  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>{parkData.name}</Typography>
                {/* <Typography>{dogTypes[dogData.type]?.displayName}</Typography> */}
                {parkData.distance && (
                  <Typography>{parkData.distance} meters away</Typography>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Address: {parkData.address}</Typography>
                <Typography>Description: {parkData.description}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Dog Likes: {parkData.dogLikes}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
