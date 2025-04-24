import {
  Box,
  Card,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  styled,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import CardGalleryComponent from "./CardGalleryComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import { useUser } from "../../users/providers/UserProvider";
import { useLocation } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        marginRight: "30px",
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        marginRight: "30px",
        transform: "rotate(180deg)",
      },
    },
  ],
}));

function CardComponent({
  data,
  handleLikeUnlikePark,
  handleLikeUnlikeDog,
  handleSwipeDog,
  TopCard = true,
}) {
  const { loginDog } = useUser();
  const isMobile = useMediaQuery("(max-width:1025px)");
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const isDogInfoRoute = location.pathname === "/dog-info";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //for mobile
  if (isMobile)
    return (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            height: isMobile ? null : 500,
            m: 2,
            borderRadius: 5,
            backgroundColor: "var(--creame)",
            boxShadow: TopCard ? "0px 0px 20px" : "none",
          }}
        >
          <Grid2 container size={12}>
            <CardGalleryComponent data={data} />
            {isDogInfoRoute ? (
              <CardBody
                data={data}
                loginDog={loginDog}
                handleLikeUnlikePark={handleLikeUnlikePark}
              />
            ) : (
              <>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardBody
                    data={data}
                    loginDog={loginDog}
                    handleLikeUnlikePark={handleLikeUnlikePark}
                  />
                </Collapse>
              </>
            )}
          </Grid2>
        </Card>
        {data.distance && loginDog ? (
          <Box
            sx={{
              position: "absolute",
              bottom: -15,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <CardActionBar
              data={data}
              handleSwipeDog={handleSwipeDog}
              handleLikeUnlikeDog={handleLikeUnlikeDog}
              loginDog={loginDog}
            />
          </Box>
        ) : null}
      </Box>
    );
  // for PC
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        className="card-responsive-size"
        sx={{
          width: isDogInfoRoute ? "700px" : "60vw",
          height: isDogInfoRoute ? "500px" : "61vh",
          m: 2,
          borderRadius: 5,
          backgroundColor: "var(--creame)",
          boxShadow: TopCard ? "0px 0px 20px" : "none",
        }}
      >
        <Grid2 container size={12}>
          <Grid2 size={6}>
            <CardGalleryComponent data={data} />
          </Grid2>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid2 size={5.98}>
            <CardBody
              data={data}
              loginDog={loginDog}
              handleLikeUnlikePark={handleLikeUnlikePark}
            />
          </Grid2>
        </Grid2>
      </Card>
      {data.distance && loginDog ? (
        <Box
          sx={{
            position: "absolute",
            bottom: -15,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <CardActionBar
            data={data}
            handleSwipeDog={handleSwipeDog}
            handleLikeUnlikeDog={handleLikeUnlikeDog}
            loginDog={loginDog}
          />
        </Box>
      ) : null}
    </Box>
  );
}

export default CardComponent;
// קומפוננטה נטענת עוד לפני שמוצהרת בפועל //
