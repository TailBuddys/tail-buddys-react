import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Fab,
  Grid2,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ParkDetailsComponent({
  parkData,
  loginDog,
  handleLikeUnlikePark,
}) {
  const [likesData, setLikesData] = useState(parkData.dogLikes);

  const confirmLike = (parkId, dogId) => {
    handleLikeUnlikePark(parkId, dogId).then((data) => {
      setLikesData(data.dogLikes);
    });
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: "flex" }}>
                <Grid2 size={9}>
                  <Typography>{parkData.name}</Typography>
                  {parkData.distance && (
                    <Typography>{parkData.distance} Km away</Typography>
                  )}
                </Grid2>
                <Grid2 size={3}>
                  {loginDog && (
                    <Box>
                      {likesData?.some((d) => d.id === parseInt(loginDog)) ? (
                        <Fab
                          color="error"
                          onClick={() => {
                            confirmLike(parkData.id, parseInt(loginDog));
                          }}
                        >
                          <FavoriteIcon />
                        </Fab>
                      ) : (
                        <Fab
                          onClick={() => {
                            confirmLike(parkData.id, parseInt(loginDog));
                          }}
                        >
                          <FavoriteIcon />
                        </Fab>
                      )}
                    </Box>
                  )}
                </Grid2>
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
                  {likesData.map((dog, index) => (
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
