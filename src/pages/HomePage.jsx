import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import PageHeader from "../components/PageHeader";
import useDogs from "../dogs/hooks/useDogs";
import initialCreateDogForm from "../dogs/helpers/initialForms/initialCreateDogForm";
import createDogSchema from "../dogs/models/createDogSchema";
import useForm from "../forms/hooks/useForm";
import CreateDogForm from "../dogs/components/CreateDogForm";

const HomePage = () => {
  const navigate = useNavigate();

  const { handleCreateDog } = useDogs();

  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialCreateDogForm, createDogSchema, handleCreateDog);

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
              <CreateDogForm
                onSubmit={onSubmit}
                onReset={handleReset}
                validateForm={validateForm}
                title={"register form"}
                errors={errors}
                data={data}
                onInputChange={handleChange}
              />
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
