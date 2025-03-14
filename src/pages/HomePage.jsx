import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useUser } from "../users/providers/UserProvider";
import PageHeader from "../components/PageHeader";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <>
      <PageHeader
        title="Welcome to Daniel Business Cards"
        subtitle="Free and fun website for businesses advertising"
      />
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            <strong>Explore our users designs</strong>
          </Typography>
          <Box justifyContent="center" display="flex">
            <Box width="100%"></Box>
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
        <Box sx={{ my: 4, py: 4, backgroundColor: "#f0f0f0" }}>
          <Typography sx={{ color: "black" }} variant="h5" gutterBottom>
            <strong>Why Eeverybody Loves Our Business Card Website</strong>
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Create Business Cards Easily",
                description:
                  "With our user-friendly builder, you can create and update your business cards in minutes.",
                icon: "computer",
                image: "/assets/imgs/costumize.png",
              },
              {
                title: "Search for Businesses",
                description:
                  "Easily find other businesses on our site and see how many likes they have.",
                icon: "search",
                image: "/assets/imgs/screen.png",
              },
              {
                title: "Reach More Customers",
                description:
                  "Using our site allows you to reach out to more customers and enhance your advertising.",
                icon: "thumb_up",
                image: "/assets/imgs/customers-hands.png",
              },
            ].map((item, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ marginTop: 16, maxWidth: "30%" }}
                  />
                  <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "black" }} variant="body1">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          {user && user.isBusiness === false ? (
            <Box sx={{ paddingTop: 5 }}>
              <Typography>
                <strong>
                  You must be registered as Business to create Business cards
                </strong>
              </Typography>
            </Box>
          ) : null}
          {user && user.isBusiness === true ? (
            <Button
              onClick={() => {
                navigate(ROUTES.CREATE_CARD);
              }}
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
            >
              Create new Business Card
            </Button>
          ) : null}
          {!user ? (
            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              Signup
            </Button>
          ) : null}
        </Box>
        {/* Business Cards Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            <strong>Our Top Liked Business Cards</strong>
          </Typography>
          <Grid container spacing={2} justifyContent="center"></Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
