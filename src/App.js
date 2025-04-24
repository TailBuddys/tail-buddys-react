import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UserProvider from "./users/providers/UserProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import AlertProvider from "./providers/AlertProvider";
import Layout from "./layout/Layout";
import Router from "./routes/Router";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import DogProvider from "./dogs/providers/DogProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <SnackbarProvider>
          <DogProvider>
            <AlertProvider>
              <CustomThemeProvider>
                <Layout>
                  <Router />
                </Layout>
              </CustomThemeProvider>
            </AlertProvider>
          </DogProvider>
        </SnackbarProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

// טסט להצגת כרטיס כולל קריאה לבאק
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

// function App() {
//   const [parks, setParks] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://localhost:7121/Park")
//       .then((response) => {
//         setParks(response.data); // Set the array of parks
//       })
//       .catch((error) => {
//         console.error("Error fetching park data:", error);
//       });
//   }, []);

//   if (parks.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       spacing={3}
//       style={{ marginTop: "20px" }}
//     >
//       {parks.map((park) => (
//         <Grid item xs={12} sm={6} md={4} key={park.id}>
//           <Card sx={{ maxWidth: 345 }}>
//             {/* Check if park has an image */}
//             {park.images && park.images.length > 0 ? (
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={park.images[0]}
//                 alt={park.name}
//                 onError={(e) => {
//                   e.target.src =
//                     "https://via.placeholder.com/345x140?text=No+Image";
//                 }} // Fallback image
//               />
//             ) : (
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image="https://via.placeholder.com/345x140?text=No+Image"
//                 alt="No image available"
//               />
//             )}

//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {park.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Description:</strong> {park.description}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Address:</strong> {park.address}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Dog Likes:</strong> {park.dogLikes}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// export default App;
