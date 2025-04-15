import React from "react";
import {
  Avatar,
  AvatarGroup,
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
                  <Typography>{parkData.distance} Km away</Typography>
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
              <TableCell sx={{ display: "flex", justifyContent: "start" }}>
                <Typography>Dog Likes:</Typography>
                <AvatarGroup max={6}>
                  {parkData.dogLikes.map((dog, index) => (
                    <Avatar key={index} alt={dog.name} src={dog.imageUrl} />
                  ))}
                </AvatarGroup>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
