import { Box, Typography } from "@mui/material";
import MatchCompponent from "./MatchCompponent";

const MatchScreenComponent = ({ handleUnmatch, matches }) => {
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
            <MatchCompponent handleUnmatch={handleUnmatch} match={match} />
          </Box>
        ))
      ) : (
        <Typography>You have no matches yet 😭</Typography>
      )}
    </Box>
  );
};

export default MatchScreenComponent;
