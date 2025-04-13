import { useCallback, useRef, useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schema, handleSubmit) {
  const [data, setData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const resetGoogleAddressRef = useRef(null);

  const validateProperty = useCallback(
    (name, value) => {
      const obj = { [name]: value };
      const generateSchema = Joi.object({ [name]: schema[name] });
      const { error } = generateSchema.validate(obj);

      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(data);
    if (error) {
      return false;
    }
    return true;
  }, [schema, data]);

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      let value;
      if (name === "birthDate") {
        value = event.target.value.toISOString().split(".")[0];
      } else if (event.target.name === "vaccinated") {
        value = event.target.checked;
      } else {
        value = event.target.value;
      }

      const errorMessage = validateProperty(name, value);
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      }
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [validateProperty]
  );

  const handleAddressChange = useCallback(
    (address, placeId) => {
      if (!address || !placeId) {
        handleChange({ target: { name: "address", value: "" } });
        handleChange({ target: { name: "lon", value: "" } });
        handleChange({ target: { name: "lat", value: "" } });
        validateForm();
        return;
      }

      handleChange({ target: { name: "address", value: address } });
      handleChange({ target: { name: "lon", value: placeId.lng } });
      handleChange({ target: { name: "lat", value: placeId.lat } });
      validateForm();
    },
    [handleChange, validateForm]
  );

  const handleSelectAddress = useCallback(
    (address, placeId) => {
      if (handleAddressChange) {
        handleAddressChange(address, placeId);
      }
    },
    [handleAddressChange]
  );

  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
    if (resetGoogleAddressRef.current) {
      resetGoogleAddressRef.current();
    }
  }, [initialForm]);

  const onSubmit = useCallback(() => {
    handleSubmit(data);
  }, [handleSubmit, data]);

  return {
    data,
    errors,
    resetGoogleAddressRef,
    handleChange,
    handleAddressChange,
    handleSelectAddress,
    handleReset,
    validateForm,
    onSubmit,
    setData,
  };
}
