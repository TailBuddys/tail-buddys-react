import {
  // Avatar,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function UserInformation({ userData }) {
  return (
    <Box>
      {/* <Avatar src={userData.image.url} alt={userData.image.alt} />  תמונות משתמש מובנות?!?*/}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Full Name:
                <Typography>
                  {userData.firstName + " " + userData.lastName}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                userID:<Typography>{userData.id}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Email:<Typography>{userData.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Phone:<Typography>{userData.phone}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Birth Date:<Typography>{userData.birthDate}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Gender:<Typography>{userData.gender}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
