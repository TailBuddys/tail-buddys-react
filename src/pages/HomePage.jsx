import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import PageHeader from "../components/PageHeader";
import useWebSocket from "../ws/useWebSocket";

const HomePage = () => {
  const navigate = useNavigate();
  const { notifications } = useWebSocket(1);
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
              <div>
                <h2>Dog Matches</h2>
                <ul>
                  {notifications.map((match, index) => (
                    <li key={index}>Match ID: {match}</li>
                  ))}
                </ul>
              </div>
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
