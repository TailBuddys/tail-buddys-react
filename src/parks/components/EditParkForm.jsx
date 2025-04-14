import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import GoogleAddressComponent from "../../components/GoogleAddressComponent";

export default function EditParkForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  handleSelectAddress,
  resetGoogleAddressRef,
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
      <Input
        name="name"
        label="name"
        error={errors.name}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <GoogleAddressComponent
        onReset={(callback) => (resetGoogleAddressRef.current = callback)} // ✅ pass reset setter
        onSelectAddress={handleSelectAddress} // לדחוף את לון ולאט כמו ששלחנו ערכים בתאריך
        data={data}
      />
    </Form>
  );
}
