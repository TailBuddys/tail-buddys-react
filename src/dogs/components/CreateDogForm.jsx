import React, { useMemo, useRef } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import GoogleAddressComponent from "../../components/GoogleAddressComponent";

export default function CreateDogForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  onAddressChange, // ✅ ADDED
}) {
  const resetGoogleAddressRef = useRef(null);

  const handleSelectAddress = useMemo(() => {
    return (address, placeId) => {
      if (onAddressChange) {
        onAddressChange(address, placeId);
      }
    };
  }, [onAddressChange]);

  const handleResetAddress = useMemo(() => {
    return () => {
      if (resetGoogleAddressRef.current) {
        resetGoogleAddressRef.current(); // ✅ reset input
      }
      if (onAddressChange) {
        onAddressChange("", null); // ✅ notify parent
      }
    };
  }, [onAddressChange]);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={() => {
        if (onReset) onReset(); // ✅ Call parent reset if needed
        handleResetAddress(); // ✅ Actually reset the address input
      }}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Input
        name="name"
        label="name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <GoogleAddressComponent
        onReset={(callback) => (resetGoogleAddressRef.current = callback)} // ✅ pass reset setter
        onSelectAddress={handleSelectAddress}
      />
    </Form>
  );
}
