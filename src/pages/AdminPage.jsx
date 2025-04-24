import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useDogs from "../dogs/hooks/useDogs";
import useUsers from "../users/hooks/useUsers";
import { getUser } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Spinner from "../components/Spinner";

export default function AdminPage() {
  const user = getUser();
  const [users, setUsers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const { handleGetAllDogsAdmin, handleDeleteDogAdmin } = useDogs();
  const { handleGetAllUsers, handleDeleteUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return; // wait for user to load
    if (!user.IsAdmin) {
      navigate(ROUTES.ROOT);
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await handleGetAllUsers();
        setUsers(usersData);
        const dogsData = await handleGetAllDogsAdmin();
        setDogs(dogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [handleGetAllUsers, handleGetAllDogsAdmin, navigate, user.isAdmin]);

  if (!user) return <Spinner />; // Or a loading spinner

  const handleDeleteUserClick = async (userId) => {
    try {
      await handleDeleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setDogs(dogs.filter((dog) => dog.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteDogClick = async (dogId) => {
    try {
      await handleDeleteDogAdmin(dogId);
      setDogs(dogs.filter((dog) => dog.id !== dogId));
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  const getGenderText = (genderCode) => {
    switch (genderCode) {
      case 0:
        return "Female";
      case 1:
        return "Male";
      case 2:
        return "Other";
      default:
        return "Unknown";
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Users Table Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Users Management
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "80vh", overflow: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.birthDate
                        ? new Date(user.birthDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {user.gender !== null
                        ? getGenderText(user.gender)
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteUserClick(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Dogs Table Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Dogs Management
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "80vh", overflow: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Owner ID</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dogs.map((dog) => (
                  <TableRow key={dog.id}>
                    <TableCell>{dog.id}</TableCell>
                    <TableCell>{dog.name}</TableCell>
                    <TableCell>{dog.userId}</TableCell>
                    <TableCell>{dog.gender ? "Male" : "Female"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteDogClick(dog.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
