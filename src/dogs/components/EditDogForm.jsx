import React, { useEffect, useState } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function EditForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  onDateChange,
}) {
  const [gender, setGender] = useState(data.gender ?? "");

  useEffect(() => {
    if (data.gender !== undefined && data.gender !== null) {
      setGender(data.gender);
    }
  }, [data.gender]);

  const handleChange = (event) => {
    setGender(event.target.value);
    onInputChange(event);
  };
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Input
        name="firstName"
        label="first name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="lastName"
        label="last name"
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="email"
        label="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="birthDate"
          label="birth Date"
          error={errors.birthDate}
          onChange={onDateChange}
          value={data.birthDate ? dayjs(data.birthDate) : null}
          data={data}
          sm={6}
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
          onChange={handleChange}
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
          <MenuItem value={2}>Other</MenuItem>
        </Select>
      </FormControl>
    </Form>
  );
}
