import React, { useState } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
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
        name="FirstName"
        label="first name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="LastName"
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
      <DatePicker
        name="birthDate"
        label="birth Date"
        error={errors.birthDate}
        onChange={onDateChange}
        data={data}
        sm={6}
      />
      <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          name="gender"
          labelId="gender"
          id="demo-simple-select"
          value={gender}
          label="Gender"
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
