import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import GoogleAddressComponent from "../../components/GoogleAddressComponent";
import { Box } from "@mui/material";

export default function CreateDogForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  resetGoogleAddressRef,
  handleSelectAddress,
}) {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={() => {
        if (onReset) onReset();
      }}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Input
          name="name"
          label="name"
          error={errors.first}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <GoogleAddressComponent
          onReset={(callback) => (resetGoogleAddressRef.current = callback)}
          onSelectAddress={handleSelectAddress}
          data={data}
        />
      </Box>
    </Form>
  );
}
