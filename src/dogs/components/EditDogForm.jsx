import React, { useEffect } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { pink } from "@mui/material/colors";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GoogleAddressComponent from "../../components/GoogleAddressComponent";
import useDogs from "../hooks/useDogs";

export default function EditDogForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  gender,
  size,
  setGender,
  setSize,
  dogType,
  setDogType,
  onInputChange,
  onDateChange,
  handleGenderChange,
  handleTypeChange,
  handleSelectAddress,
  resetGoogleAddressRef,
  handleSizeChange,
}) {
  const { dogTypes, fetchDogTypes } = useDogs();

  useEffect(() => {
    if (data.gender !== undefined && data.gender !== null) {
      setGender(data.gender ? 1 : 0);
    }
  }, [data.gender, setGender]);

  useEffect(() => {
    if (data.size !== undefined && data.size !== null) {
      setSize(data.size);
    }
  }, [data.size, setSize]);

  useEffect(() => {
    if (data.type !== undefined && data.type !== null) {
      setDogType(data.type);
    }
  }, [data.type, setDogType]);

  useEffect(() => {
    fetchDogTypes();
  }, [fetchDogTypes]);

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
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="description"
        label="description"
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select
          name="type"
          labelId="type"
          label="type"
          id="demo-simple-select"
          value={dogType}
          error={errors.type}
          onChange={handleTypeChange}
        >
          {dogTypes.map(({ value, displayName }) => (
            <MenuItem key={value} value={value}>
              {displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="size">Size</InputLabel>
        <Select
          name="size"
          labelId="size"
          id="demo-simple-select"
          label="size"
          value={size} // ליצור אפקט
          error={errors.size}
          onChange={handleSizeChange}
        >
          <MenuItem value={0}>Small</MenuItem>
          <MenuItem value={1}>Medium</MenuItem>
          <MenuItem value={2}>Large</MenuItem>
        </Select>
      </FormControl>
      {/* <CheckBox
        name="vaccinated"
        label="vaccinated"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      /> */}
      <FormControlLabel
        value="end"
        control={
          <Checkbox
            //checked={data.vaccinated}//
            sx={{
              color: "grey",
              opacity: 0.4,
              "&.Mui-checked": {
                color: pink[600],
                opacity: 1,
              },
            }}
            icon={<VaccinesIcon />}
            checkedIcon={<VaccinesIcon />}
          />
        }
        label="vaccinated"
        labelPlacement="start"
      />
      <GoogleAddressComponent
        onReset={(callback) => (resetGoogleAddressRef.current = callback)} // ✅ pass reset setter
        onSelectAddress={handleSelectAddress}
        address={data.address}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="birthdate"
          label="birth Date"
          error={errors.birthdate}
          onChange={onDateChange}
          value={data.birthdate ? dayjs(data.birthdate) : null}
          data={data}
          sm={6}
          slotProps={{
            textField: {
              inputProps: { readOnly: true },
              fullWidth: true,
              error: Boolean(errors.birthdate),
              helperText: errors.birthdate,
            },
          }}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          name="gender"
          labelId="gender"
          id="demo-simple-select"
          label="Gender"
          value={gender}
          error={errors.gender}
          onChange={handleGenderChange}
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
      </FormControl>
    </Form>
  );
}
