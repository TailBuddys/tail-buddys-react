import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Container,
  Fab,
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
      console.log(data.dogLikes);
    });
  };

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
                  {likesData.map((dog, index) => (
                    <Avatar key={index} alt={dog.name} src={dog.imageUrl} />
                  ))}
                </AvatarGroup>
              </TableCell>
              {loginDog && (
                <TableCell sx={{ display: "flex", justifyContent: "start" }}>
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
                </TableCell>
              )}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
