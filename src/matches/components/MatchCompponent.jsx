import React, { useEffect, useState } from "react";
import { styled, useTheme as useMuiTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import MatchMenu from "./MatchMenu";

const MatchCompponent = ({
  handleUnmatch,
  handleCreateChat,
  match,
  notifications,
}) => {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [screenSize]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "red",
      color: "red",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <Box sx={{ padding: 1 }}>
      <Tooltip
        title={`Match with ${match.receiverDogName}`}
        slots={{
          transition: Zoom,
        }}
        arrow
      >
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={(event) => {
            setAnchor(event.currentTarget);
            setIsOpen(true);
          }}
        >
          {notifications.includes(match.id) ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt="dog avatar"
                  src={match.receiverDogImage}
                />
                <Box
                  component="img"
                  src="/assets/images/itsAMatchIcon.png"
                  alt="overlay"
                  sx={{
                    width: 70,
                    height: 50,
                    position: "absolute",
                    bottom: -20,
                    left: "45%",
                    transform: "translateX(-50%)",
                  }}
                />
              </Box>
            </StyledBadge>
          ) : (
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={"dog avatar"}
              src={match.receiverDogImage}
            />
          )}
        </IconButton>
      </Tooltip>
      <MatchMenu
        handleCreateChat={handleCreateChat}
        handleUnmatch={handleUnmatch}
        match={match}
        anchorEl={anchorEL}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Box>
  );
};

export default MatchCompponent;

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// import useAxios from "../../hooks/useAxios";
// import useWebSocket from "../../ws/useWebSocket";

// const MatchCompponent = () => {
//   const [matches, setMatches] = useState([]);
//   const connection = useWebSocket(); // Use the custom hook to manage SignalR connection
//   const API_URL = "https://localhost:7121";
//   useAxios();

//   // Listen for new match notifications
//   useEffect(() => {
//     if (connection) {
//       // Listen to the "ReceiveNewMatch" event
//       connection.on("ReceiveNewMatch", (matchId) => {
//         fetchMatchDetails(matchId); // Fetch match details based on the matchId
//       });

//       return () => {
//         // Cleanup the SignalR listeners when the component unmounts
//         connection.off("ReceiveNewMatch");
//       };
//     }
//   }, [connection]);

//   // Function to fetch match details from the API
//   const fetchMatchDetails = async (matchId) => {
//     try {
//       const response = await fetch(`${API_URL}/matches/${matchId}`); // Replace with your API URL
//       console.log(response);
//       const match = await response.json();
//       if (match) {
//         setMatches((prevMatches) => [...prevMatches, match]); // Add new match to the state
//       }
//     } catch (error) {
//       console.error("Error fetching match details:", error);
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         New Match Notifications
//       </Typography>

//       <Grid container spacing={2}>
//         {matches.map((match) => (
//           <Grid item xs={12} sm={6} md={4} key={match.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="subtitle1">
//                   {match.isLike ? "Like" : "Dislike"} from Dog{" "}
//                   {match.senderDogId} to Dog {match.receiverDogId}
//                 </Typography>
//                 {match.isMatch && (
//                   <Typography variant="body2" color="success.main">
//                     It's a match! 🎉
//                   </Typography>
//                 )}
//                 <Typography variant="body2" color="text.secondary">
//                   {new Date(match.createdAt).toLocaleString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default MatchCompponent;
