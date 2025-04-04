import { useCallback, useRef, useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schema, handleSubmit) {
  const [data, setData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [gender, setGender] = useState(data.gender ?? "");
  const [size, setSize] = useState(data.size ?? "");
  const [dogType, setDogType] = useState(data.type ?? "");
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
    if (error) return false;
    return true;
  }, [schema, data]);

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
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

  const handleDateChange = useCallback(
    (date) => {
      const name = "birthDate";
      const value = date.toISOString().split(".")[0];
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

  const handleGenderChange = (event) => {
    // הועבר לפה גלובלי לכלב ליוזר ולפארק
    setGender(event.target.value);
    handleChange(event);
  };

  const handleSizeChange = (event) => {
    // הועבר לפה גלובלי לכלב ליוזר ולפארק
    setSize(event.target.value);
    handleChange(event);
  };

  const handleTypeChange = (event) => {
    // הועבר לפה גלובלי לכלב ליוזר ולפארק
    // אמנם משומש רק בדף של עריכת כלב, אבל מבחינת מוסכמות יותר נכון שישב פה כדי שהקוד יהיה יותר דינאמי לעתיד
    setDogType(event.target.value);
    handleChange(event);
  };

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
      // return (address, placeId) => { // בדף עשינו את זה כדי להחזיר כפונקציה ולא כדי להפעיל מיידית, פה אנחנו רוצים להפעיל מיידית
      if (handleAddressChange) {
        handleAddressChange(address, placeId);
      }
      // };
    },
    [handleAddressChange]
  );

  // const handleResetAddress = useCallback(() => { // יש מצב שכבר לא צריך את הפונקציה הזו אני עייף
  //   return () => {
  //     if (resetGoogleAddressRef.current) {
  //       resetGoogleAddressRef.current();
  //     }
  //     if (handleAddressChange) {
  //       handleAddressChange("", null);
  //     }
  //   };
  // }, [handleAddressChange]);

  const handleReset = useCallback(() => {
    // מיישם בתוכו כבר את הריסט של הכתובת
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
    gender,
    dogType,
    resetGoogleAddressRef,
    size,
    handleChange,
    handleDateChange,
    handleGenderChange,
    handleTypeChange,
    handleAddressChange,
    handleSelectAddress,
    handleReset,
    handleSizeChange,
    validateForm,
    onSubmit,
    setData,
    setGender,
    setDogType,
    setSize,
  };
}
