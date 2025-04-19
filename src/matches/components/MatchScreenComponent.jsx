import { Box, Typography } from "@mui/material";
import MatchCompponent from "./MatchCompponent";

const MatchScreenComponent = ({ handleUnmatch, handleCreateChat, matches }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      {(matches ?? []).length > 0 ? (
        matches.map((match, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MatchCompponent
              handleUnmatch={handleUnmatch}
              match={match}
              handleCreateChat={handleCreateChat}
            />
          </Box>
        ))
      ) : (
        <Typography>You have no new matches 😭</Typography>
      )}
    </Box>
  );
};

export default MatchScreenComponent;
