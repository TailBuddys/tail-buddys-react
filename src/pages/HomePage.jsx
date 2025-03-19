import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import PageHeader from "../components/PageHeader";
// import useWebSocket from "../ws/useWebSocket";
import MatchCompponent from "../matches/components/MatchCompponent";

const HomePage = () => {
  const navigate = useNavigate();
  // const connection = useWebSocket();
  return (
    <>
      <PageHeader
        title="Welcome to Daniel Business Cards"
        subtitle="Free and fun website for businesses advertising"
      />
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ my: 4 }}>
          <Box justifyContent="center" display="flex">
            <Container
              sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>navigated</Typography>
              <MatchCompponent />
              {/* <GoogleAddressComponent
                onSelect={(location) => console.log(location)}
              /> */}
            </Container>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              navigate(ROUTES.CARDS);
            }}
          >
            Explore more Designs
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
